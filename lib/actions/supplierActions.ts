"use server";

import { CreateSupplierDBType, ReadSupplierDBType, UpdateSupplierDBType, SupplierFormValueType } from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
} from "../supabaseUtils";

export async function createSupplier({
  values,
  supabase,
}: {
  values: SupplierFormValueType;
  supabase?: SupabaseClient;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType | null;
}> {
  return createRecord({
    values,
    supabase,
    tableName: "supplier",
    formToDatabaseFn: (values, userId) => {
      return { name: values.name, user_id: userId, email: values.email, phone: values.phone, address: values.address };
    },
  });
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
  return getSingleRecordById("supplier", id) as Promise<{ dbData: ReadSupplierDBType; dbError: PostgrestError }>;
}

export async function deleteSupplier(id: number) {
  return deleteSingleRecordById("supplier", id);
}
