"use server";

import { UpdateClientDBType, ClientFormValueType, ReadClientDBType } from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
} from "../supabaseUtils";

export async function createClient({
  values,
  supabase,
}: {
  values: ClientFormValueType;
  supabase?: SupabaseClient;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return createRecord({
    values,
    supabase,
    tableName: "client",
    formToDatabaseFn: (values, userId) => {
      return { name: values.name, user_id: userId, email: values.email, phone: values.phone, address: values.address };
    },
  });
}

export async function updateClient(
  values: ClientFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  const updatedClient: UpdateClientDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { error: dbError } = await supabase.from("client").update(updatedClient).eq("id", id);
  return { dbError };
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
