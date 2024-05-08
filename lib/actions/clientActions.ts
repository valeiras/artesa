"use server";

import { CreateClientDBType, UpdateClientDBType, ClientFormValueType, ReadClientDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
} from "../supabaseUtils";

export async function createClient(values: ClientFormValueType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newClient: CreateClientDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { error: dbError } = await supabase.from("client").insert(newClient);
  return { dbError };
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
