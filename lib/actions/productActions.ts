"use server";

import {
  CreateProductDBType,
  ReadProductDBType,
  ReadProductBatchDBType,
  UpdateProductDBType,
  ProductFormValueType,
  ReadProductWithBatchesType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

export async function createProduct(values: ProductFormValueType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newProduct: CreateProductDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("product").insert(newProduct);
  return { dbError };
}

export async function updateProduct(
  values: ProductFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedProduct: UpdateProductDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("product").update(updatedProduct).eq("id", id);
  return { dbError };
}

export async function getAllProducts() {
  return getAllRecords("product") as Promise<{ dbData: ReadProductDBType[]; dbError: PostgrestError }>;
}

export async function getAllProductsWithBatches(): Promise<{
  dbData: ReadProductWithBatchesType[];
  dbError: PostgrestError;
}> {
  let dbData: ReadProductWithBatchesType[], dbError: PostgrestError, dbDataBatches: ReadProductBatchDBType[];
  ({ dbData, dbError } = (await getAllRecords("product")) as {
    dbData: ReadProductWithBatchesType[];
    dbError: PostgrestError;
  });
  if (dbError) return { dbData, dbError };

  ({ dbData: dbDataBatches, dbError } = (await getAllRecords("product_batch")) as {
    dbData: ReadProductBatchDBType[];
    dbError: PostgrestError;
  });

  dbData = dbData.map((item) => {
    const productBatches = dbDataBatches.filter(({ product_id }) => item.id === product_id);
    return { ...item, batches: productBatches };
  });
  return { dbData, dbError };
}

export async function getSingleProduct(id: number) {
  return getsingleRecord("product", id) as Promise<{ dbData: ReadProductDBType; dbError: PostgrestError }>;
}

export async function deleteProduct(id: number) {
  return deleteRecord("product", id);
}
