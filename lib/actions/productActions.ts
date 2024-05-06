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
import { PostgrestError } from "@supabase/supabase-js";
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
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newProduct: CreateProductDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError, data: dbData } = await supabase.from("product").insert(newProduct).select();
  return { dbError, dbData: dbData?.[0] || null };
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
  ({ dbData, dbError } = await getAllProducts());
  if (dbError) return { dbData, dbError };

  ({ dbData: dbDataBatches, dbError } = await getAllProductBatches());
  if (dbError) return { dbData, dbError };

  dbData = dbData.map((item) => {
    const batches = dbDataBatches.filter(({ product_id }) => item.id === product_id);
    return { ...item, batches };
  });
  return { dbData, dbError };
}

export async function getAllProductsWithBatchesAndIngredients(): Promise<{
  dbData: ReadProductWithBatchesAndIngredientsType[] | null;
  dbError?: PostgrestError;
  error?: unknown;
}> {
  let { dbData, dbError } = await getAllProductsWithBatches();
  if (dbError) throw new Error(dbError.message);

  const { productIngredients, productIngredientsError, commodityIngredients, commodityIngredientsError } =
    await getAllProductRecipes();

  if (productIngredientsError) throw new Error(productIngredientsError.message);
  if (commodityIngredientsError) throw new Error(commodityIngredientsError.message);

  dbData = dbData.map((item) => {
    const currProductIngredients = productIngredients
      ?.filter(({ product_id }) => product_id === item.id)
      .map(({ product_ingredient_id, ingredient_name }) => {
        return { ingredient_id: product_ingredient_id, ingredient_name };
      });
    const currCommodityIngredients = commodityIngredients
      ?.filter(({ product_id }) => product_id === item.id)
      .map(({ commodity_ingredient_id, ingredient_name }) => {
        return { ingredient_id: commodity_ingredient_id, ingredient_name };
      });

    return { ...item, productIngredients: currProductIngredients, commodityIngredients: currCommodityIngredients };
  });

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
