"use server";

import { ReadSupplierDBType, UpdateSupplierDBType, SupplierFormValueType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
} from "../supabaseUtils";

function formToDatabaseFn(values: SupplierFormValueType, userId: string) {
  return { name: values.name, user_id: userId, email: values.email, phone: values.phone, address: values.address };
}

export async function createSupplier({ values }: { values: SupplierFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType | null;
}> {
  return createRecord({
    values,
    tableName: "supplier",
    formToDatabaseFn,
  });
}

export async function updateSupplier({
  values,
  recordId,
}: {
  values: SupplierFormValueType;
  recordId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "supplier",
    formToDatabaseFn,
    recordId,
  });
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
