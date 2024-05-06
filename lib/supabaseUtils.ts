import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/createSupabaseClient";

import { auth } from "@clerk/nextjs";
import { PostgrestError } from "@supabase/supabase-js";

type TableDB =
  | "supplier"
  | "client"
  | "commodity"
  | "commodity_batch"
  | "product"
  | "product_batch"
  | "product_batch_recipe"
  | "product_recipe"
  | "supplier";

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

export function isPostgresError(data: any): data is PostgrestError {
  return data && (data as PostgrestError).message !== undefined;
}

export async function getAllRecords(tableName: TableDB) {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select();
  return { dbData, dbError };
}

export async function getSingleRecordById(tableName: TableDB, id: number) {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from(tableName).select().eq("id", id).maybeSingle();
  return { dbData, dbError };
}

export async function deleteRecordById(tableName: TableDB, id: number) {
  const supabase = await connectAndRedirect();

  const { error: dbError } = await supabase.from(tableName).delete().eq("id", id);
  return { dbError };
}
