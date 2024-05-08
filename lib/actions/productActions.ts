"use server";

import {
  CreateProductDBType,
  ReadProductDBType,
  ReadProductBatchDBType,
  UpdateProductDBType,
  ProductFormValueType,
  ReadProductWithBatchesAndIngredientsType,
  ReadProductWithBatchesType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getSingleRecordById,
  deleteSingleRecordById,
} from "../supabaseUtils";
import { deleteProductRecipe, getAllProductRecipes } from "./productRecipeActions";
import { deleteAllProductBatchesByProductId, getAllProductBatches } from "./productBatchActions";

export async function createProduct(
  values: ProductFormValueType,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType | null;
}> {
  let dbError: PostgrestError | null = null;
  let dbData: ReadProductDBType | null = null;

  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();
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
  productId: number
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
    ({ error: dbError, data: dbData } = await supabase.from("product").update(updatedProduct).eq("id", productId));
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

  let dbProducts: ReadProductDBType[] | null = null;
  let dbData: ReadProductWithBatchesType[] | null = null;
  let dbError: PostgrestError | null = null;
  let dbBatches: ReadProductBatchDBType[] | null = null;

  try {
    [{ dbData: dbProducts, dbError }, { dbData: dbBatches, dbError }] = await Promise.all([
      getAllProducts(supabase),
      getAllProductBatches(supabase),
    ]);

    dbData =
      dbProducts?.map((item) => {
        const batches = dbBatches?.filter(({ product_id }) => item.id === product_id) || [];
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
  let dbDataWithBatches: ReadProductWithBatchesType[] | null = null;
  let dbData: ReadProductWithBatchesAndIngredientsType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ dbData: dbDataWithBatches, dbError } = await getAllProductsWithBatches(supabase));
    if (!dbDataWithBatches || dbError) {
      console.log(dbError);
      return { dbData, dbError };
    }

    const { productIngredients, productIngredientsError, commodityIngredients, commodityIngredientsError } =
      await getAllProductRecipes(supabase);

    if (!productIngredients || productIngredientsError || !commodityIngredients || commodityIngredientsError) {
      console.log(productIngredientsError);
      console.log(commodityIngredientsError);
      return { dbData, dbError };
    }

    dbData = dbDataWithBatches.map((item) => {
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

      return { ...item, product_ingredients: currProductIngredients, commodity_ingredients: currCommodityIngredients };
    });
  } catch (error) {
    console.log(error);
  }

  return { dbData, dbError };
}

export async function getSingleProduct(productId: number, supabase?: SupabaseClient) {
  return getSingleRecordById("product", productId, supabase) as Promise<{
    dbData: ReadProductDBType;
    dbError: PostgrestError;
  }>;
}

export async function deleteProduct(
  productId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbError: PostgrestError | null = null;

  try {
    ({ dbError } = await deleteAllProductBatchesByProductId(productId, supabase));
    ({ dbError } = await deleteProductRecipe(productId, supabase));
    ({ dbError } = await deleteSingleRecordById("product", productId, supabase));
  } catch (error) {
    console.log(error);
  }
  return { dbError };
}
