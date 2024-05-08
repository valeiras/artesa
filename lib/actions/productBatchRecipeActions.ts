"use server";

import { CreateProductBatchRecipeDBType, ReadProductBatchRecipeDBType } from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect } from "../supabaseUtils";

function createProductBatchRecipeArray({
  batchId,
  userId,
  ingredientBatchIds,
  ingredientAmounts,
  ingredientType,
}: {
  batchId: number;
  userId: string;
  ingredientBatchIds: { id: string }[];
  ingredientAmounts: { amount: number }[];
  ingredientType: "commodity" | "product";
}): CreateProductBatchRecipeDBType[] {
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

export async function createProductBatchRecipe({
  commodityIngredientBatchIds,
  commodityIngredientAmounts,
  productIngredientBatchIds,
  productIngredientAmounts,
  batchId,
}: {
  commodityIngredientBatchIds: {
    id: string;
  }[];
  commodityIngredientAmounts: {
    amount: number;
  }[];
  productIngredientBatchIds: {
    id: string;
  }[];
  productIngredientAmounts: {
    amount: number;
  }[];
  batchId: number;
}): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  let dbError: PostgrestError | null = null;

  try {
    const newCommodityIngredientsBatchRecipe = createProductBatchRecipeArray({
      batchId,
      userId,
      ingredientAmounts: commodityIngredientAmounts,
      ingredientBatchIds: commodityIngredientBatchIds,
      ingredientType: "commodity",
    });
    const newProductIngredientsBatchRecipe = createProductBatchRecipeArray({
      batchId,
      userId,
      ingredientAmounts: productIngredientAmounts,
      ingredientBatchIds: productIngredientBatchIds,
      ingredientType: "product",
    });
    ({ error: dbError } = await supabase
      .from("product_batch_recipe")
      .insert([...newCommodityIngredientsBatchRecipe, ...newProductIngredientsBatchRecipe]));
  } catch (error) {
    console.log(error);
  }

  return { dbError };
}

export async function getAllProductBatchRecipes(supabase?: SupabaseClient) {
  const [
    { namedIngredients: productIngredients, ingredientsError: productIngredientsError },
    { namedIngredients: commodityIngredients, ingredientsError: commodityIngredientsError },
  ] = await Promise.all([
    getIngredientsWithName({ ingredientType: "product" }, supabase),
    getIngredientsWithName({ ingredientType: "commodity" }, supabase),
  ]);

  return { productIngredients, productIngredientsError, commodityIngredients, commodityIngredientsError };
}

export async function getIngredientsWithName(
  { ingredientType }: { ingredientType: "commodity" | "product" },
  supabase?: SupabaseClient
): Promise<{
  namedIngredients: (ReadProductBatchRecipeDBType & { ingredient_name: string })[] | null;
  ingredientsError: PostgrestError | null;
}> {
  if (!supabase) supabase = await connectAndRedirect();

  const { data: ingredientsData, error: ingredientsError } = await supabase
    .from("product_recipe")
    .select()
    .not(`${ingredientType}_ingredient_id`, "is", null);
  if (ingredientsError) return { namedIngredients: null, ingredientsError };

  const ingredientIds = ingredientsData?.map((it) => it[`${ingredientType}_ingredient_id`] as number);

  const { data: ingredientNames, error: ingredientNamesError } = await supabase
    .from(`${ingredientType}`)
    .select()
    .in("id", ingredientIds || []);
  if (ingredientNamesError) return { namedIngredients: null, ingredientsError: ingredientNamesError };

  const namedIngredients = ingredientsData?.map((it) => {
    const ingredientName = ingredientNames?.find(({ id }) => id === it[`${ingredientType}_ingredient_id`])?.name || "";
    return { ...it, ingredient_name: ingredientName };
  });

  return { namedIngredients, ingredientsError: null };
}

export async function getSingleProductBatchRecipe(
  productBatchId: number,
  supabase?: SupabaseClient
): Promise<{ dbData: ReadProductBatchRecipeDBType[] | null; dbError: PostgrestError | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbData: ReadProductBatchRecipeDBType[] | null = null;
  let dbError: PostgrestError | null = null;
  ({ data: dbData, error: dbError } = await supabase
    .from("product_batch_recipe")
    .select()
    .eq("product_batch_id", productBatchId));
  return { dbData, dbError };
}

export async function deleteProductBatchRecipe(productBatchId: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase
    .from("product_batch_recipe")
    .delete()
    .eq("product_batch_id", productBatchId);
  return { dbError };
}

export async function deleteProductBatchRecipes(productBatchIds: number[], supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase
    .from("product_batch_recipe")
    .delete()
    .in("product_batch_id", productBatchIds);
  return { dbError };
}
