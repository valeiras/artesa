import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/createSupabaseClient";

import { auth } from "@clerk/nextjs";
import { PostgrestError } from "@supabase/supabase-js";

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
