"use server";

import { CreateCustomerDBType, UpdateCustomerDBType, CustomerFormValueType, ReadCustomerDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

export async function createCustomer(values: CustomerFormValueType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newCustomer: CreateCustomerDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { error: dbError } = await supabase.from("customer").insert(newCustomer);
  return { dbError };
}

export async function updateCustomer(
  values: CustomerFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedCustomer: UpdateCustomerDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { error: dbError } = await supabase.from("customer").update(updatedCustomer).eq("id", id);
  return { dbError };
}

export async function getAllCustomers() {
  return getAllRecords("customer") as Promise<{ dbData: ReadCustomerDBType[]; dbError: PostgrestError }>;
}

export async function getSingleCustomer(id: number) {
  return getsingleRecord("customer", id) as Promise<{ dbData: ReadCustomerDBType; dbError: PostgrestError }>;
}

export async function deleteCustomer(id: number) {
  return deleteRecord("customer", id);
}
