"use server";

import { ReadSupplierDBType, SupplierFormValueType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
} from "../supabaseUtils";

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

export async function deleteSupplier({ recordId }: { recordId: number }) {
  return deleteSingleRecordById({ tableName: "suppliers", recordId });
}
