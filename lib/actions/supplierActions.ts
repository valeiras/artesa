"use server";

import { CreateSupplierDBType, ReadSupplierDBType, UpdateSupplierDBType, SupplierFormValueType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

export async function createSupplier(values: SupplierFormValueType): Promise<{
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

  const { error: dbError } = await supabase.from("supplier").insert(newSupplier);
  return { dbError };
}

export async function updateSupplier(
  values: SupplierFormValueType,
  id: number
): Promise<{
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

  const { error: dbError } = await supabase.from("supplier").update(updatedSupplier).eq("id", id);
  return { dbError };
}

export async function getAllSuppliers() {
  return getAllRecords("supplier") as Promise<{ dbData: ReadSupplierDBType[]; dbError: PostgrestError }>;
}

export async function getSingleSupplier(id: number) {
  return getsingleRecord("supplier", id) as Promise<{ dbData: ReadSupplierDBType; dbError: PostgrestError }>;
}

export async function deleteSupplier(id: number) {
  return deleteRecord("supplier", id);
}
