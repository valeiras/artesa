"use server";

import {
  CreateCommodityBatchDBType,
  UpdateCommodityBatchDBType,
  CommodityBatchFormValueType,
  ReadCommodityBatchDBType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  checkPermissionsAndRedirect,
  connectAndRedirect,
  createRecord,
  deleteRecordsById,
  deleteSingleRecordById,
  getAllRecords,
} from "../supabaseUtils";

export async function createCommodityBatch({
  values,
  supabase,
}: {
  values: CommodityBatchFormValueType;
  supabase?: SupabaseClient;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityBatchDBType | null;
}> {
  return createRecord({
    values,
    supabase,
    tableName: "commodity_batch",
    formToDatabaseFn: (values, userId) => {
      return {
        commodity_id: values.commodityId,
        date: values.date.toISOString(),
        initial_amount: values.initialAmount,
        external_id: values.externalId,
        supplier_id: parseInt(values.supplierId),
        comments: values.comments,
        user_id: userId,
      };
    },
  });
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
  return deleteSingleRecordById("commodity_batch", id);
}

export async function deleteAllCommodityBatchesByCommodityId(
  commodityId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null }> {
  let dbError: PostgrestError | null = null;
  if (!supabase) supabase = await connectAndRedirect();

  try {
    const { data } = await supabase.from("commodity_batch").select("id").eq("commodity_id", commodityId);
    const commodityBatchIds = data?.map(({ id }) => {
      return id as number;
    });
    if (commodityBatchIds) ({ dbError } = await deleteRecordsById("commodity_batch", commodityBatchIds, supabase));
    console.log(dbError);
  } catch (error) {
    console.log(error);
  }
  return { dbError };
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

export async function getCommodityId(
  commodityBatchId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null; dbData: { id: number } | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbError: PostgrestError | null = null;
  let dbData: { id: number } | null = null;

  try {
    ({ error: dbError, data: dbData } = await supabase
      .from("commodity_batch")
      .select("commodity_id")
      .eq("id", commodityBatchId)
      .maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  }
  return { dbError, dbData };
}
