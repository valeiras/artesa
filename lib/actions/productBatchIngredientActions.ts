"use server";

import {
  CreateProductBatchIngredientDBType,
  ProductBatchFormValueType,
  ReadProductBatchIngredientDBType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, deleteRecordsByField, withErrorHandling } from "../supabaseUtils";

export async function createProductBatchRecipe({
  values,
  batchId,
}: {
  values: ProductBatchFormValueType;
  batchId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchIngredientDBType[] | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;
  let dbData: ReadProductBatchIngredientDBType[] | null = null;

  try {
    const newCommodityIngredientsBatchRecipe = createProductBatchRecipeArray({
      batchId,
      userId,
      values,
      ingredientType: "commodity",
    });
    const newProductIngredientsBatchRecipe = createProductBatchRecipeArray({
      batchId,
      userId,
      values,
      ingredientType: "product",
    });
    ({ error: dbError, data: dbData } = await supabase
      .from("product_batch_ingredients")
      .insert([...newCommodityIngredientsBatchRecipe, ...newProductIngredientsBatchRecipe]));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
}

export async function getProductBatchRecipeByProductBatchId({
  productBatchId,
}: {
  productBatchId: number;
}): Promise<{ dbData: ReadProductBatchIngredientDBType[] | null; dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from("product_batch_ingredients").select().eq("product_batch_id", productBatchId));
}

export async function deleteProductBatchRecipeByProductBatchId({
  productBatchId,
}: {
  productBatchId: number;
}): Promise<{ dbError: PostgrestError | null }> {
  return deleteRecordsByField({
    tableName: "product_batch_ingredients",
    fieldName: "product_batch_id",
    fieldValue: productBatchId,
  });
}

function createProductBatchRecipeArray({
  batchId,
  userId,
  values,
  ingredientType,
}: {
  batchId: number;
  userId: string;
  values: ProductBatchFormValueType;
  ingredientType: "commodity" | "product";
}): CreateProductBatchIngredientDBType[] {
  const ingredientAmounts = values[`${ingredientType}IngredientAmounts`];
  const ingredientBatchIds = values[`${ingredientType}IngredientBatchIds`];

  if (ingredientAmounts.length !== ingredientBatchIds.length)
    throw new Error("The length of the batch ids and amounts do not match");

  return ingredientBatchIds.map(({ id }, idx) => {
    return {
      [`${ingredientType}_ingredient_batch_id`]: parseInt(id),
      product_batch_id: batchId,
      used_amount: ingredientAmounts[idx]?.amount,
      user_id: userId,
    };
  });
}
