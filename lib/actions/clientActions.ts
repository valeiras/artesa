"use server";

import { ClientFormValueType, ReadClientDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
} from "../supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: ClientFormValueType; userId: string }) {
  return { name: values.name, user_id: userId, email: values.email, phone: values.phone, address: values.address };
}

export async function createClient({ values }: { values: ClientFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return createRecord({
    values,
    tableName: "clients",
    formToDatabaseFn,
  });
}

export async function updateClient({ values, recordId }: { values: ClientFormValueType; recordId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "clients",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllClients(): Promise<{ dbData: ReadClientDBType[] | null; dbError: PostgrestError | null }> {
  return getAllRecords({ tableName: "clients" });
}

export async function getSingleClient({
  recordId,
}: {
  recordId: number;
}): Promise<{ dbData: ReadClientDBType | null; dbError: PostgrestError | null }> {
  return getSingleRecordById({ tableName: "clients", recordId });
}

export async function deleteClient({ recordId }: { recordId: number }): Promise<{ dbError: PostgrestError | null }> {
  return deleteSingleRecordById({ tableName: "clients", recordId });
}
