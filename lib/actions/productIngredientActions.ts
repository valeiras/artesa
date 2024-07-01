"use server";

import { CreateProductIngredientDBType, ReadProductIngredientDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  checkPermissionsAndRedirect,
  connectAndRedirect,
  deleteRecordsByField,
} from "../supabaseUtils";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

export async function createProductRecipe({
  ingredientIds,
  productId,
}: {
  ingredientIds: { id: string }[];
  productId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductIngredientDBType[] | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  await checkPermissionsAndRedirect(supabase);

  let dbError: PostgrestError | null = null;
  let dbData: ReadProductIngredientDBType[] | null = null;

  try {
    const newProductRecipe: CreateProductIngredientDBType[] = createProductRecipeArray({
      userId,
      productId,
      ingredientIds,
    });

    ({ error: dbError, data: dbData } = await supabase.from("product_ingredients").insert(newProductRecipe));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
}

export async function getProductRecipeByProductId({
  productId,
}: {
  productId: number;
}): Promise<{ dbData: ReadProductIngredientDBType[] | null; dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  let dbData: ReadProductIngredientDBType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase
      .from("product_ingredients")
      .select()
      .eq("product_id", productId));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
}

export async function deleteProductRecipeByProductId({
  productId,
}: {
  productId: number;
}): Promise<{ dbError: PostgrestError | null }> {
  return deleteRecordsByField({
    tableName: "product_ingredients",
    fieldName: "product_id",
    fieldValue: productId,
  });
}

function createProductRecipeArray({
  productId,
  userId,
  ingredientIds,
}: {
  productId: number;
  userId: string;
  ingredientIds: { id: string }[];
}): CreateProductIngredientDBType[] {
  return ingredientIds.map(({ id }) => {
    const newIngredient: CreateProductIngredientDBType = { product_id: productId, user_id: userId };
    if (id.startsWith(COMMODITY_PREFIX)) {
      newIngredient.commodity_ingredient_id = parseInt(id.replace(COMMODITY_PREFIX, ""));
    } else {
      newIngredient.product_ingredient_id = parseInt(id.replace(PRODUCT_PREFIX, ""));
    }
    return newIngredient;
  });
}
