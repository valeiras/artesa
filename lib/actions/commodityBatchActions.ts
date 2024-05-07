"use server";

import {
  CreateCommodityBatchDBType,
  UpdateCommodityBatchDBType,
  CommodityBatchFormValueType,
  ReadCommodityBatchDBType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { authenticateAndRedirect, connectAndRedirect, deleteRecordById, getAllRecords } from "../supabaseUtils";

export async function createCommodityBatch(
  values: CommodityBatchFormValueType,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();

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
  values: CommodityBatchFormValueType,
  id: number,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();
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

export async function deleteCommodityBatch(id: number, supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  return deleteRecordById("commodity_batch", id);
}

export async function getAllCommodityBatches(supabase?: SupabaseClient) {
  if (!supabase) supabase = await connectAndRedirect();
  return getAllRecords("commodity_batch") as Promise<{ dbData: ReadCommodityBatchDBType[]; dbError: PostgrestError }>;
}

export async function getCommodityBatches(
  commodityIds: number[],
  supabase?: SupabaseClient
): Promise<{ dbData: ReadCommodityBatchDBType[] | null; dbError: PostgrestError | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  const { data: dbData, error: dbError } = await supabase
    .from("commodity_batch")
    .select()
    .in("commodity_id", commodityIds);
  return { dbData, dbError };
}
