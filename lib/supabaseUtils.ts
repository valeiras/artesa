import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/createSupabaseClient";
import { auth } from "@clerk/nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { FieldValues } from "react-hook-form";
import { Tables, TablesInsert } from "./database.types";
import { PublicTableName } from "./types";

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

export async function checkPermissionsAndRedirect(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").maybeSingle();
  if (!data?.role || data.role === "minimum") {
    redirect("/");
  }
}

export async function getAllRecords<TTable extends PublicTableName>({
  tableName,
}: {
  tableName: TTable;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable>[] | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from(tableName).select());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function getSingleRecordById<TTable extends PublicTableName>({
  tableName,
  recordId,
}: {
  tableName: TTable;
  recordId: number;
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable> | null }> {
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable> | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from(tableName).select().eq("id", recordId).maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function getRecordsByIds<TTable extends PublicTableName>({
  tableName,
  recordIds,
}: {
  tableName: TTable;
  recordIds: number[];
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable>[] | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase
      .from(tableName)
      .select()
      .in("id", recordIds)
      .returns<Tables<TTable>[]>());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function deleteSingleRecordById<TTable extends PublicTableName>({
  tableName,
  recordId,
}: {
  tableName: TTable;
  recordId: number;
}): Promise<{ dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;

  try {
    ({ error: dbError } = await supabase.from(tableName).delete().eq("id", recordId));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError };
  }
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

  let dbError: PostgrestError | null = null;

  try {
    ({ error: dbError } = await supabase.from(tableName).delete().eq(fieldName, fieldValue));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError };
  }
}

export async function deleteRecordsByIds<TTable extends PublicTableName>({
  tableName,
  recordIds,
}: {
  tableName: TTable;
  recordIds: number[];
}): Promise<{ dbError: PostgrestError | null; dbData: Tables<TTable>[] | null }> {
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable>[] | null = null;

  try {
    ({ error: dbError } = await supabase.from(tableName).delete().in("id", recordIds).select());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
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
  await checkPermissionsAndRedirect(supabase, userId);

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable> | null = null;

  const newRecord: TablesInsert<TTable> = formToDatabaseFn({ values, userId });

  try {
    ({ error: dbError, data: dbData } = await supabase.from(tableName).insert(newRecord).select().maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
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
  await checkPermissionsAndRedirect(supabase, userId);

  let dbError: PostgrestError | null = null;
  let dbData: Tables<TTable> | null = null;

  const newRecord: TablesInsert<TTable> = formToDatabaseFn({ values, userId });

  try {
    ({ error: dbError, data: dbData } = await supabase
      .from(tableName)
      .update(newRecord)
      .eq("id", recordId)
      .select()
      .maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
}
