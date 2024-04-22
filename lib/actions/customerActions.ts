"use server";

import { CreateCustomerDBType, ReadCustomerDBType, UpdateCustomerDBType, CustomerFormType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect } from "../supabaseUtils";

export async function createCustomer(values: CustomerFormType): Promise<{
  dbData: ReadCustomerDBType[] | null;
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

  const { data: dbData, error: dbError } = await supabase.from("customer").insert(newCustomer);
  return { dbData, dbError };
}

export async function updateCustomer(
  values: CustomerFormType,
  id: string
): Promise<{
  dbData: ReadCustomerDBType[] | null;
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

  const { data: dbData, error: dbError } = await supabase.from("customer").update(updatedCustomer).eq("id", id);
  return { dbData, dbError };
}

export async function getAllCustomers(): Promise<{
  dbData: ReadCustomerDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("customer").select();
  return { dbData, dbError };
}

export async function getSingleCustomer(id: string): Promise<{
  dbData: ReadCustomerDBType | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("customer").select().eq("id", id).maybeSingle();
  return { dbData, dbError };
}

export async function deleteCustomer(id: number): Promise<{
  dbData: ReadCustomerDBType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  const { data: dbData, error: dbError } = await supabase.from("customer").delete().eq("id", id);
  return { dbData, dbError };
}
