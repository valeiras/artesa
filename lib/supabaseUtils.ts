import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/createSupabaseClient";
import { auth } from "@clerk/nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { PostgrestBuilder } from "@supabase/postgrest-js";
import { FieldValues } from "react-hook-form";
import { Tables, TablesInsert } from "./database.types";
import { PublicTableName } from "./types";
import { DBError } from "@/lib/errors";

export async function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");

  return userId;
}

export async function connectAndRedirect() {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({
    template: "supabase",
  });
  if (!supabaseAccessToken) redirect("/");

  const supabase = await createSupabaseClient(supabaseAccessToken);
  return supabase;
}

export async function getUserSettings(supabase: SupabaseClient) {
  return withErrorHandling(supabase.from("user_settings").select("has_mockup_data: hasMockupData"));
}

export async function getAllRecords<TTable extends PublicTableName>({
  tableName,
}: {
  tableName: TTable;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(supabase.from(tableName).select());
}

export async function getSingleRecordById<TTable extends PublicTableName>({
  tableName,
  recordId,
}: {
  tableName: TTable;
  recordId: number;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable> | null }> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(supabase.from(tableName).select().eq("id", recordId).maybeSingle());
}

export async function getRecordsByIdArray<TTable extends PublicTableName>({
  tableName,
  recordIds,
}: {
  tableName: TTable;
  recordIds: number[];
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).select().in("id", recordIds).returns<Tables<TTable>[]>());
}

export async function getRecordsByField<TTable extends PublicTableName, TField extends keyof Tables<TTable>>({
  tableName,
  fieldName,
  fieldValue,
}: {
  tableName: TTable;
  fieldName: string & TField;
  fieldValue: NonNullable<Tables<TTable>[TField]>;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).select().eq(fieldName, fieldValue).returns<Tables<TTable>[]>());
}

export async function getRecordsByFieldArray<TTable extends PublicTableName, TField extends keyof Tables<TTable>>({
  tableName,
  fieldName,
  fieldValues,
}: {
  tableName: TTable;
  fieldName: string & TField;
  fieldValues: NonNullable<Tables<TTable>[TField][]>;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).select().in(fieldName, fieldValues).returns<Tables<TTable>[]>());
}

export async function deleteSingleRecordById<TTable extends PublicTableName>({
  tableName,
  recordId,
}: {
  tableName: TTable;
  recordId: number;
}): Promise<{ dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).delete().eq("id", recordId));
}

export async function deleteRecordsByField<TTable extends PublicTableName, TField extends keyof Tables<TTable>>({
  tableName,
  fieldName,
  fieldValue,
}: {
  tableName: TTable;
  fieldName: string & TField;
  fieldValue: NonNullable<Tables<TTable>[TField]>;
}): Promise<{ dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).delete().eq(fieldName, fieldValue));
}

export async function deleteRecordsByIds<TTable extends PublicTableName>({
  tableName,
  recordIds,
}: {
  tableName: TTable;
  recordIds: number[];
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from(tableName).delete().in("id", recordIds).select());
}

export async function createRecord<TForm extends FieldValues, TTable extends PublicTableName>({
  values,
  formToDatabaseFn,
  tableName,
}: {
  values: TForm;
  formToDatabaseFn: ({ values, userId }: { values: TForm; userId: string }) => TablesInsert<TTable>;
  tableName: TTable;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: Tables<TTable> | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase: SupabaseClient = await connectAndRedirect();

  const newRecord: TablesInsert<TTable> = formToDatabaseFn({ values, userId });
  return withErrorHandling(supabase.from(tableName).insert(newRecord).select().maybeSingle());
}

export async function updateRecord<TForm extends FieldValues, TTable extends PublicTableName>({
  values,
  formToDatabaseFn,
  tableName,
  recordId,
}: {
  values: TForm;
  formToDatabaseFn: ({ values, userId }: { values: TForm; userId: string }) => TablesInsert<TTable>;
  tableName: TTable;
  recordId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: Tables<TTable> | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase: SupabaseClient = await connectAndRedirect();

  const newRecord: TablesInsert<TTable> = formToDatabaseFn({ values, userId });

  return withErrorHandling(supabase.from(tableName).update(newRecord).eq("id", recordId).select().maybeSingle());
}

export const withErrorHandling = async <T>(
  fn: PostgrestBuilder<T>
): Promise<{ dbData: T | null; dbError: PostgrestError | null }> => {
  let dbError: PostgrestError | null = null;
  let dbData: T | null = null;
  try {
    const { data, error } = await fn;
    if (error) throw new DBError(error?.message || "Something went wrong");
    dbData = data;
    dbError = error;
  } catch (e) {
    if (e instanceof DBError) {
      console.error(e.message);
    } else {
      console.error("Something went wrong");
    }
  } finally {
    return { dbData, dbError };
  }
};
