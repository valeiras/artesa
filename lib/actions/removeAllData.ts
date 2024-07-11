"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, withErrorHandling } from "../db/supabaseUtils";

export async function removeAllData() {
  const supabase: SupabaseClient = await connectAndRedirect();
  const userId = await authenticateAndRedirect();

  await withErrorHandling(supabase.from("sale_ingredients").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("sales").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("product_batch_ingredients").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("product_batches").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("product_ingredients").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("commodity_batches").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("commodities").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("products").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("clients").delete().in("user_id", [userId]));
  await withErrorHandling(supabase.from("suppliers").delete().in("user_id", [userId]));
}
