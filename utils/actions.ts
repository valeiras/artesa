"use server";

import { auth, useAuth } from "@clerk/nextjs";
import { CreateSupplierDBType, ReadSupplierDBType, SupplierFormType } from "./types";
import { redirect } from "next/navigation";
import { Database } from "@/utils/database.types";
import { createSupabaseClient } from "@/lib/createSupabaseClient";
import { PostgrestError } from "@supabase/supabase-js";

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

export async function createSupplierAction(values: SupplierFormType): Promise<ReadSupplierDBType[] | PostgrestError> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newSupplier: CreateSupplierDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { data, error } = await supabase.from("supplier").insert(newSupplier).select();
  if (!data) return error;
  return data;
}

export async function getAllSuppliersAction(): Promise<ReadSupplierDBType[] | null> {
  const supabase = await connectAndRedirect();

  const { data } = await supabase.from("supplier").select();
  if (!data) return null;
  return data;
}
