"use server";

import {
  CreateProductBatchDBType,
  UpdateProductBatchDBType,
  ProductBatchFormValueType,
  ReadProductBatchDBType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, deleteRecordById, getAllRecords } from "../supabaseUtils";

export async function createProductBatch(values: ProductBatchFormValueType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newProductBatch: CreateProductBatchDBType = {
    product_id: parseInt(values.productId),
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    comments: values.comments,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("product_batch").insert(newProductBatch);
  return { dbError };
}

export async function updateProductBatch(
  values: ProductBatchFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedProductBatch: UpdateProductBatchDBType = {
    product_id: parseInt(values.productId),
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    comments: values.comments,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("product_batch").update(updatedProductBatch).eq("id", id);
  return { dbError };
}

export async function deleteProductBatch(id: number) {
  return deleteRecordById("product_batch", id);
}

export async function getAllProductBatches() {
  return getAllRecords("product_batch") as Promise<{ dbData: ReadProductBatchDBType[]; dbError: PostgrestError }>;
}
