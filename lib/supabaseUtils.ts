import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/createSupabaseClient";

import { auth } from "@clerk/nextjs";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { PublicSchema } from "./types";

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

export function isPostgresError(data: any): data is PostgrestError {
  return data && (data as PostgrestError).message !== undefined;
}

type TableName = keyof PublicSchema["Tables"];

export async function getAllRecords(tableName: TableName, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select();
  return { dbData, dbError };
}

export async function getSingleRecordById(tableName: TableName, id: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select().eq("id", id).maybeSingle();
  return { dbData, dbError };
}

export async function deleteSingleRecordById(tableName: TableName, id: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from(tableName).delete().eq("id", id);
  return { dbError };
}

export async function deleteRecordsById(tableName: TableName, ids: number[], supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from(tableName).delete().in("id", ids);
  return { dbError };
}
