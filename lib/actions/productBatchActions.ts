"use server";

import {
  CreateProductBatchDBType,
  UpdateProductBatchDBType,
  ProductBatchFormValueType,
  ReadProductBatchDBType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, deleteRecordById, getAllRecords } from "../supabaseUtils";

export async function createProductBatch(
  values: ProductBatchFormValueType,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType | null;
}> {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: ReadProductBatchDBType | null = null;

  const newProductBatch: CreateProductBatchDBType = {
    product_id: parseInt(values.productId),
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    comments: values.comments,
    user_id: userId,
  };

  try {
    ({ error: dbError, data: dbData } = await supabase
      .from("product_batch")
      .insert(newProductBatch)
      .select()
      .maybeSingle());
  } catch (error) {
    console.log(error);
  }

  return { dbError, dbData };
}

export async function updateProductBatch(
  values: ProductBatchFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType | null;
}> {
  let dbError: PostgrestError | null = null;
  let dbData: ReadProductBatchDBType | null = null;

  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  try {
    const updatedProductBatch: UpdateProductBatchDBType = {
      product_id: parseInt(values.productId),
      date: values.date.toISOString(),
      initial_amount: values.initialAmount,
      external_id: values.externalId,
      comments: values.comments,
      user_id: userId,
    };

    ({ error: dbError, data: dbData } = await supabase.from("product_batch").update(updatedProductBatch).eq("id", id));
  } catch (error) {
    console.log(error);
  }
  return { dbError, dbData };
}

export async function deleteProductBatch(id: number, supabase?: SupabaseClient) {
  return deleteRecordById("product_batch", id, supabase);
}

export async function getAllProductBatches(supabase?: SupabaseClient) {
  return getAllRecords("product_batch", supabase) as Promise<{
    dbData: ReadProductBatchDBType[];
    dbError: PostgrestError;
  }>;
}

export async function getProductBatches(
  productIds: number[],
  supabase?: SupabaseClient
): Promise<{ dbData: ReadProductBatchDBType[] | null; dbError: PostgrestError | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  const { data: dbData, error: dbError } = await supabase.from("product_batch").select().in("product_id", productIds);
  return { dbData, dbError };
}
