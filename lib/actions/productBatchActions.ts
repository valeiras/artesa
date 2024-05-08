"use server";

import {
  CreateProductBatchDBType,
  UpdateProductBatchDBType,
  ProductBatchFormValueType,
  ReadProductBatchDBType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  deleteSingleRecordById,
  deleteRecordsById,
  getAllRecords,
  checkPermissionsAndRedirect,
} from "../supabaseUtils";
import { deleteProductBatchRecipe, deleteProductBatchRecipes } from "./productBatchRecipeActions";

export async function createProductBatch(
  values: ProductBatchFormValueType,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType | null;
}> {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();
  await checkPermissionsAndRedirect(supabase, userId);

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

export async function deleteProductBatch(
  productBatchId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null }> {
  let dbError: PostgrestError | null = null;
  if (!supabase) supabase = await connectAndRedirect();
  try {
    ({ dbError } = await deleteProductBatchRecipe(productBatchId, supabase));
    ({ dbError } = await deleteSingleRecordById("product_batch", productBatchId, supabase));
  } catch (error) {
    console.log(error);
  }
  return { dbError };
}

export async function deleteAllProductBatchesByProductId(
  productId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null }> {
  let dbError: PostgrestError | null = null;
  if (!supabase) supabase = await connectAndRedirect();
  try {
    const { data } = await supabase.from("product_batch").select("id").eq("product_id", productId);
    const productBatchIds = data?.map(({ id }) => {
      return id as number;
    });
    if (productBatchIds) {
      ({ dbError } = await deleteProductBatchRecipes(productBatchIds, supabase));
      ({ dbError } = await deleteRecordsById("product_batch", productBatchIds, supabase));
    }
  } catch (error) {
    console.log(error);
  }
  return { dbError };
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

export async function getProductId(
  productBatchId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null; dbData: { id: number } | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbError: PostgrestError | null = null;
  let dbData: { id: number } | null = null;

  try {
    ({ error: dbError, data: dbData } = await supabase
      .from("product_batch")
      .select("product_id")
      .eq("id", productBatchId)
      .maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  }
  return { dbError, dbData };
}
