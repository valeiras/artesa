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

export async function authenticateConnectCheckPermissionAndRedirect(supabase?: SupabaseClient) {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();
  await checkPermissionsAndRedirect(supabase, userId);

  return { userId, supabase };
}

export function isPostgresError(data: any): data is PostgrestError {
  return data && (data as PostgrestError).message !== undefined;
}

export async function getAllRecords(tableName: PublicTableName, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select();
  return { dbData, dbError };
}

export async function getSingleRecordById(tableName: PublicTableName, id: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select().eq("id", id).maybeSingle();
  return { dbData, dbError };
}

export async function deleteSingleRecordById(tableName: PublicTableName, id: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from(tableName).delete().eq("id", id);
  return { dbError };
}

export async function deleteRecordsById(tableName: PublicTableName, ids: number[], supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from(tableName).delete().in("id", ids);
  return { dbError };
}

export async function createRecord<TForm extends FieldValues, TTable extends PublicTableName>({
  values,
  formToDatabaseFn,
  tableName,
}: {
  values: TForm;
  formToDatabaseFn: (values: TForm, userId: string) => TablesInsert<TTable>;
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

  const newRecord: TablesInsert<TTable> = formToDatabaseFn(values, userId);

  try {
    ({ error: dbError, data: dbData } = await supabase.from(tableName).insert(newRecord).select().maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
}
