"use server";

import { ReadSupplierDBType, ReadSupplierWithBatchesType, SupplierFormValueType } from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
  connectAndRedirect,
  withErrorHandling,
} from "../db/supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: SupplierFormValueType; userId: string }) {
  return {
    name: values.name,
    email: values.email,
    phone: values.phone,
    address: values.address,
    comments: values.comments,
    user_id: userId,
  };
}

export async function createSupplier({ values }: { values: SupplierFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType | null;
}> {
  return createRecord({
    values,
    tableName: "suppliers",
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
    tableName: "suppliers",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllSuppliers(): Promise<{
  dbData: ReadSupplierDBType[] | null;
  dbError: PostgrestError | null;
}> {
  return getAllRecords({ tableName: "suppliers" });
}

export async function getSingleSupplier({ recordId }: { recordId: number }) {
  return getSingleRecordById({ tableName: "suppliers", recordId }) as Promise<{
    dbData: ReadSupplierDBType;
    dbError: PostgrestError;
  }>;
}

export async function getSingleSupplierWithBatches({ recordId }: { recordId: number }): Promise<{
  dbData: ReadSupplierWithBatchesType | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(
    supabase
      .from("suppliers")
      .select(
        `
        *, commodity_batches(external_id, date, initial_amount, commodity:commodities(name, unit, id))  
      `
      )
      .eq("id", recordId)
      .maybeSingle()
  );
}

export async function deleteSupplier({ recordId }: { recordId: number }) {
  return deleteSingleRecordById({ tableName: "suppliers", recordId });
}
