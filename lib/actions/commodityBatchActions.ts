"use server";

import { CreateCommodityBatchDBType, UpdateCommodityBatchDBType, CommodityBatchFormType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, deleteRecord } from "../supabaseUtils";

export async function createCommodityBatch(values: CommodityBatchFormType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newCommodityBatch: CreateCommodityBatchDBType = {
    commodity_id: values.commodityId,
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    supplier_id: parseInt(values.supplierId),
    comments: values.comments,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("commodity_batch").insert(newCommodityBatch);
  return { dbError };
}

export async function updateCommodityBatch(
  values: CommodityBatchFormType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedCommodityBatch: UpdateCommodityBatchDBType = {
    commodity_id: values.commodityId,
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    supplier_id: parseInt(values.supplierId),
    comments: values.comments,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("commodity_batch").update(updatedCommodityBatch).eq("id", id);
  return { dbError };
}

export async function deleteCommodityBatch(id: number) {
  return deleteRecord("commodity_batch", id);
}
