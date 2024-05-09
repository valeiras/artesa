"use server";

import {
  ReadProductDBType,
  ProductFormValueType,
  ReadProductWithBatchesAndIngredientsType,
  ReadProductWithBatchesType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
  getAllRecords,
} from "../supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: ProductFormValueType; userId: string }) {
  return { name: values.name, unit: values.unit, user_id: userId };
}

export async function createProduct({ values }: { values: ProductFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType | null;
}> {
  return createRecord({
    values,
    tableName: "products",
    formToDatabaseFn,
  });
}

export async function updateProduct({ values, recordId }: { values: ProductFormValueType; recordId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "products",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllProducts(): Promise<{
  dbData: ReadProductDBType[] | null;
  dbError: PostgrestError | null;
}> {
  return getAllRecords({ tableName: "products" });
}

export async function getAllProductsWithBatches(): Promise<{
  dbData: ReadProductWithBatchesType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  let dbData: ReadProductWithBatchesType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from("products").select(`*, batches:product_batches (*)`));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function getAllProductsWithBatchesAndIngredients(): Promise<{
  dbData: ReadProductWithBatchesAndIngredientsType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();
  let dbData: ReadProductWithBatchesAndIngredientsType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from("products").select(`*, batches:product_batches (*), 
                                                                                product_ingredientes:products(ingredient_id:id, ingredient_name:name), 
                                                                                commodity_ingredientes:commodities(ingredient_id:id, ingredient_name:name)`));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function getSingleProduct({ recordId }: { recordId: number }): Promise<{
  dbData: ReadProductDBType | null;
  dbError: PostgrestError | null;
}> {
  return getSingleRecordById({ tableName: "products", recordId });
}

export async function deleteProduct({ recordId }: { recordId: number }): Promise<{ dbError: PostgrestError | null }> {
  return deleteSingleRecordById({ tableName: "products", recordId });
}
