"use server";

import { CreateSupplierDBType, ReadSupplierDBType, UpdateSupplierDBType, SupplierFormType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect } from "../supabaseUtils";

export async function createSupplier(values: SupplierFormType): Promise<{
  dbData: ReadSupplierDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newSupplier: CreateSupplierDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { data: dbData, error: dbError } = await supabase.from("supplier").insert(newSupplier);
  return { dbData, dbError };
}

export async function updateSupplier(
  values: SupplierFormType,
  id: string
): Promise<{
  dbData: ReadSupplierDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedSupplier: UpdateSupplierDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { data: dbData, error: dbError } = await supabase.from("supplier").update(updatedSupplier).eq("id", id);
  return { dbData, dbError };
}

export async function getAllSuppliers(): Promise<{
  dbData: ReadSupplierDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("supplier").select();
  return { dbData, dbError };
}

export async function getSingleSupplier(id: string): Promise<{
  dbData: ReadSupplierDBType | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("supplier").select().eq("id", id).maybeSingle();
  return { dbData, dbError };
}

export async function deleteSupplier(id: number): Promise<{
  dbData: ReadSupplierDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("supplier").delete().eq("id", id);
  return { dbData, dbError };
}
