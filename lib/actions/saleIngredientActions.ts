"use server";

import { CreateSaleIngredientDBType, ReadSaleDBType, ReadSaleIngredientDBType, SaleFormValueType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  authenticateAndRedirect,
  checkPermissionsAndRedirect,
  deleteRecordsByField,
} from "../supabaseUtils";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

const getBatchIds = (batchIds: { id: string }[]) => {
  const commodityBatchIds = batchIds.map(({ id }) => {
    return id.startsWith(COMMODITY_PREFIX) ? parseInt(id.replace(COMMODITY_PREFIX, "")) : null;
  });
  const productBatchIds = batchIds.map(({ id }) => {
    return id.startsWith(PRODUCT_PREFIX) ? parseInt(id.replace(PRODUCT_PREFIX, "")) : null;
  });

  return { commodityBatchIds, productBatchIds };
};

const createSaleRecipeArray = ({
  values,
  userId,
  saleId,
}: {
  values: SaleFormValueType;
  userId: string;
  saleId: number;
}): CreateSaleIngredientDBType[] => {
  const { commodityBatchIds, productBatchIds } = getBatchIds(values.batchIds);
  return values.batchIds.map((_, index) => {
    return {
      user_id: userId,
      sale_id: saleId,
      product_batch_id: productBatchIds?.[index],
      commodity_batch_id: commodityBatchIds?.[index],
      sold_amount: values.amounts[index].amount,
      created_at: values.date.toISOString(),
    };
  });
};

export async function createSaleRecipe({ values, saleId }: { values: SaleFormValueType; saleId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  await checkPermissionsAndRedirect(supabase);

  let dbError: PostgrestError | null = null;
  let dbData: ReadSaleIngredientDBType[] | null = null;

  try {
    const newSaleRecipe: CreateSaleIngredientDBType[] = createSaleRecipeArray({
      userId,
      saleId,
      values,
    });

    ({ error: dbError, data: dbData } = await supabase.from("sale_ingredients").insert(newSaleRecipe));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError, dbData };
  }
}

export async function deleteSaleRecipeBySaleId({
  saleId,
}: {
  saleId: number;
}): Promise<{ dbError: PostgrestError | null }> {
  return deleteRecordsByField({
    tableName: "sale_ingredients",
    fieldName: "sale_id",
    fieldValue: saleId,
  });
}
