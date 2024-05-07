"use server";

import { CreateProductBatchRecipeDBType, ReadProductBatchRecipeDBType } from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect } from "../supabaseUtils";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

function createProductBatchRecipeArray({
  batchId,
  userId,
  ingredientBatchIds,
}: {
  batchId: number;
  userId: string;
  ingredientBatchIds: { id: string }[];
}): CreateProductBatchRecipeDBType[] {
  // return ingredientIds.map(({ id }) => {
  //   const newIngredient: CreateProductBatchRecipeDBType = { batch_id: batchId, user_id: userId };
  //   if (id.startsWith(COMMODITY_PREFIX)) {
  //     newIngredient.commodity_ingredient_id = parseInt(id.replace(COMMODITY_PREFIX, ""));
  //   } else {
  //     newIngredient.product_ingredient_id = parseInt(id.replace(PRODUCT_PREFIX, ""));
  //   }
  //   return newIngredient;
  // });
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
  };
  batchId: number;
}): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  // const { error: dbError } = await supabase.from("product_recipe").insert(newProductBatchRecipe);
  // return { dbError };
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

export async function getSingleProductBatchRecipe(productId: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { data: dbData, error: dbError } = await supabase.from("product_recipe").select().eq("product_id", productId);
  return { dbData, dbError };
}

export async function deleteProductBatchRecipe(productId: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from("product_recipe").delete().eq("product_id", productId);
  return { dbError };
}
