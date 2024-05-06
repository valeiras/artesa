"use server";

import { CreateProductRecipeDBType, UpdateProductRecipeDBType, ReadProductRecipeDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteRecordById,
} from "../supabaseUtils";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

function createProductRecipeArray({
  productId,
  userId,
  ingredientIds,
}: {
  productId: number;
  userId: string;
  ingredientIds: { id: string }[];
}): CreateProductRecipeDBType[] {
  return ingredientIds.map(({ id }) => {
    const newIngredient: CreateProductRecipeDBType = { product_id: productId, user_id: userId };
    if (id.startsWith(COMMODITY_PREFIX)) {
      newIngredient.commodity_ingredient_id = parseInt(id.replace(COMMODITY_PREFIX, ""));
    } else {
      newIngredient.product_ingredient_id = parseInt(id.replace(PRODUCT_PREFIX, ""));
    }
    return newIngredient;
  });
}

export async function createProductRecipe({
  ingredientIds,
  productId,
}: {
  ingredientIds: { id: string }[];
  productId: number;
}): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  const newProductRecipe: CreateProductRecipeDBType[] = createProductRecipeArray({ userId, productId, ingredientIds });

  const { error: dbError } = await supabase.from("product_recipe").insert(newProductRecipe);
  return { dbError };
}

export async function getAllProductRecipes() {
  const [
    { namedIngredients: productIngredients, ingredientsError: productIngredientsError },
    { namedIngredients: commodityIngredients, ingredientsError: commodityIngredientsError },
  ] = await Promise.all([
    getIngredientsWithName({ ingredientType: "product" }),
    getIngredientsWithName({ ingredientType: "commodity" }),
  ]);

  return { productIngredients, productIngredientsError, commodityIngredients, commodityIngredientsError };
}

export async function getIngredientsWithName({ ingredientType }: { ingredientType: "commodity" | "product" }): Promise<{
  namedIngredients: (ReadProductRecipeDBType & { ingredient_name: string })[] | null;
  ingredientsError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

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

export async function getSingleProductRecipe(productId: number) {
  const supabase = await connectAndRedirect();
  const { data: dbData, error: dbError } = await supabase.from("product_recipe").select().eq("product_id", productId);
  return { dbData, dbError };
}

export async function deleteProductRecipe(productId: number) {
  const supabase = await connectAndRedirect();
  const { error: dbError } = await supabase.from("product_recipe").delete().eq("product_id", productId);
  return { dbError };
}
