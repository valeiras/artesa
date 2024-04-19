"use server";

import { auth, useAuth } from "@clerk/nextjs";
import { SupplierFormType } from "./types";
import { redirect } from "next/navigation";
import { Database } from "@/utils/database.types";
import { createSupabaseClient } from "@/lib/createSupabaseClient";

type SupplierDBType = Database["public"]["Tables"]["supplier"]["Insert"];

async function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");

  return userId;
}

async function connectAndRedirect() {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({
    template: "supabase",
  });
  if (!supabaseAccessToken) redirect("/");

  const supabase = await createSupabaseClient(supabaseAccessToken);
  return supabase;
}

export async function createSupplierAction(values: SupplierFormType): Promise<SupplierDBType | null> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newSupplier: SupplierDBType = { name: values.name, user_id: userId, email: values.email, phone: values.phone };

  const { data } = await supabase.from("supplier").insert(newSupplier).select();
  if (!data) return null;
  return data[0];
}
