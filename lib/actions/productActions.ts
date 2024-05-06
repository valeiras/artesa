"use server";

import {
  CreateProductDBType,
  ReadProductDBType,
  ReadProductBatchDBType,
  UpdateProductDBType,
  ProductFormValueType,
  ReadProductWithBatchesAndIngredientsType,
  ReadProductWithBatchesType,
  ReadProductRecipeDBType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteRecordById,
} from "../supabaseUtils";
import { deleteProductRecipe, getAllProductRecipes } from "./productRecipeActions";
import { getAllProductBatches } from "./productBatchActions";

export async function createProduct(values: ProductFormValueType): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType | null;
}> {
  let dbError: PostgrestError | null = null;
  let dbData: ReadProductDBType | null = null;

  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newProduct: CreateProductDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  try {
    ({ error: dbError, data: dbData } = await supabase.from("product").insert(newProduct).select().maybeSingle());
  } catch (error) {
    console.log(error);
    dbData = null;
  }
  return { dbError, dbData };
}

export async function updateProduct(
  values: ProductFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType | null;
}> {
  let dbError: PostgrestError | null = null;
  let dbData: ReadProductDBType | null = null;

  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedProduct: UpdateProductDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  try {
    ({ error: dbError, data: dbData } = await supabase.from("product").update(updatedProduct).eq("id", id));
  } catch (error) {
    console.log(error);
    dbData = null;
  }
  return { dbError, dbData };
}

export async function getAllProducts(supabase?: SupabaseClient): Promise<{
  dbData: ReadProductDBType[] | null;
  dbError: PostgrestError | null;
}> {
  if (!supabase) supabase = await connectAndRedirect();

  let dbData: ReadProductDBType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from("product").select());
  } catch (error) {
    console.log(error);
    dbData = null;
  }
  return { dbData, dbError };
}

export async function getAllProductsWithBatches(supabase?: SupabaseClient): Promise<{
  dbData: ReadProductWithBatchesType[] | null;
  dbError: PostgrestError | null;
}> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbData: ReadProductWithBatchesType[] | null = null;
  let dbError: PostgrestError | null = null;
  let dbDataBatches: ReadProductBatchDBType[] | null = null;

  try {
    [{ dbData, dbError }, { dbData: dbDataBatches, dbError }] = await Promise.all([
      getAllProducts(supabase),
      getAllProductBatches(supabase),
    ]);

    dbData =
      dbData?.map((item) => {
        const batches = dbDataBatches?.filter(({ product_id }) => item.id === product_id) || [];
        return { ...item, batches };
      }) || null;
  } catch (error) {
    console.log(error);
  }

  return { dbData, dbError };
}

export async function getAllProductsWithBatchesAndIngredients(supabase?: SupabaseClient): Promise<{
  dbData: ReadProductWithBatchesAndIngredientsType[] | null;
  dbError: PostgrestError | null;
}> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbData: ReadProductWithBatchesAndIngredientsType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ dbData, dbError } = await getAllProductsWithBatches(supabase));
    const { productIngredients, productIngredientsError, commodityIngredients, commodityIngredientsError } =
      await getAllProductRecipes(supabase);

    if (
      !dbData ||
      dbError ||
      !productIngredients ||
      productIngredientsError ||
      !commodityIngredients ||
      commodityIngredientsError
    )
      return { dbData, dbError };

    dbData = dbData.map((item) => {
      const currProductIngredients = productIngredients
        .filter(({ product_id }) => product_id === item.id)
        .map(({ product_ingredient_id, ingredient_name }) => {
          return { ingredient_id: String(product_ingredient_id as number), ingredient_name };
        });
      const currCommodityIngredients = commodityIngredients
        .filter(({ product_id }) => product_id === item.id)
        .map(({ commodity_ingredient_id, ingredient_name }) => {
          return { ingredient_id: String(commodity_ingredient_id as number), ingredient_name };
        });

      return { ...item, productIngredients: currProductIngredients, commodityIngredients: currCommodityIngredients };
    });
  } catch (error) {
    console.log(error);
  }

  return { dbData, dbError };
}

export async function getSingleProduct(id: number) {
  return getSingleRecordById("product", id) as Promise<{ dbData: ReadProductDBType; dbError: PostgrestError }>;
}

export async function deleteProduct(id: number) {
  return deleteRecordById("product", id);
}

export async function deleteProductAndRecipe(id: number) {
  let { dbError } = await deleteProductRecipe(id);
  if (dbError) return { dbError };

  ({ dbError } = await deleteProduct(id));
  return { dbError };
}
