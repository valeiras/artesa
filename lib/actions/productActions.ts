"use server";

import {
  ReadProductDBType,
  ProductFormValueType,
  ReadProductWithBatchesAndIngredientsType,
  ReadProductWithBatchesType,
  TempReadIngredientsType,
} from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
  getAllRecords,
  withErrorHandling,
} from "../db/supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: ProductFormValueType; userId: string }) {
  return {
    name: values.name,
    unit: values.unit,
    external_id: values.externalId,
    user_id: userId,
  };
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

  return withErrorHandling(supabase.from("products").select(`*, batches:product_batches (*)`));
}

export async function getAllProductsWithBatchesAndIngredients(): Promise<{
  dbData: ReadProductWithBatchesAndIngredientsType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();
  let dbData: ReadProductWithBatchesAndIngredientsType[] | null = null;
  let tempData: (ReadProductWithBatchesType & TempReadIngredientsType)[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: tempData, error: dbError } = await supabase.from("products").select(`*, batches:product_batches (*), 
                                                                                commodity_ingredients:product_ingredients!product_id(commodities(id, name)),
                                                                                product_ingredients:product_ingredients!product_id(products!product_ingredient_id(id, name))`));

    // TODO: this must be doable with the query
    dbData =
      tempData?.map((product) => {
        const commodity_ingredients = product.commodity_ingredients
          .filter(({ commodities }) => commodities)
          .map(({ commodities }) => commodities);
        const product_ingredients = product.product_ingredients
          .filter(({ products }) => products)
          .map(({ products }) => products);
        return { ...product, commodity_ingredients, product_ingredients };
      }) || null;
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
