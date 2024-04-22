"use server";

import { CreateCustomerDBType, ReadCustomerDBType, UpdateCustomerDBType, CustomerFormType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect } from "../supabaseUtils";

export async function createCustomer(values: CustomerFormType): Promise<ReadCustomerDBType[] | PostgrestError> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newCustomer: CreateCustomerDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { data, error } = await supabase.from("customer").insert(newCustomer).select();
  if (!data) return error;
  return data;
}

export async function updateCustomer(
  values: CustomerFormType,
  id: string
): Promise<UpdateCustomerDBType[] | PostgrestError> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedCustomer: UpdateCustomerDBType = {
    name: values.name,
    user_id: userId,
    email: values.email,
    phone: values.phone,
    address: values.address,
  };

  const { data, error } = await supabase.from("customer").update(updatedCustomer).eq("id", id).select();
  if (error) return error;
  return data;
}

export async function getAllCustomers(): Promise<ReadCustomerDBType[] | null> {
  const supabase = await connectAndRedirect();

  const { data } = await supabase.from("customer").select();
  if (!data) return null;
  return data;
}

export async function getSingleCustomer(id: string): Promise<ReadCustomerDBType | null> {
  const supabase = await connectAndRedirect();

  const { data, error } = await supabase.from("customer").select().eq("id", id).maybeSingle();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function deleteCustomer(id: number): Promise<PostgrestError | null> {
  const supabase = await connectAndRedirect();

  const response = await supabase.from("customer").delete().eq("id", id);
  const { error, data } = response;
  if (error) return error;
  return data;
}
