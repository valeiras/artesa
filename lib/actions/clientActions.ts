"use server";

import { UpdateClientDBType, ClientFormValueType, ReadClientDBType } from "../types";
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

function formToDatabaseFn(values: ClientFormValueType, userId: string) {
  return { name: values.name, user_id: userId, email: values.email, phone: values.phone, address: values.address };
}

export async function createClient({ values }: { values: ClientFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return createRecord({
    values,
    tableName: "client",
    formToDatabaseFn,
  });
}

export async function updateClient({ values, recordId }: { values: ClientFormValueType; recordId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "client",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllClients() {
  return getAllRecords("client") as Promise<{ dbData: ReadClientDBType[]; dbError: PostgrestError }>;
}

export async function getSingleClient(id: number) {
  return getSingleRecordById("client", id) as Promise<{ dbData: ReadClientDBType; dbError: PostgrestError }>;
}

export async function deleteClient(id: number) {
  return deleteSingleRecordById("client", id);
}
