"use server";

import {
  CreateCommodityDBType,
  ReadCommodityDBType,
  ReadCommodityBatchDBType,
  UpdateCommodityDBType,
  CommodityFormValueType,
  ReadCommodityWithBatchesType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

export async function createCommodity(values: CommodityFormValueType): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const newCommodity: CreateCommodityDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("commodity").insert(newCommodity);
  return { dbError };
}

export async function updateCommodity(
  values: CommodityFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();
  const updatedCommodity: UpdateCommodityDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("commodity").update(updatedCommodity).eq("id", id);
  return { dbError };
}

export async function getAllCommodities() {
  return getAllRecords("commodity") as Promise<{ dbData: ReadCommodityDBType[]; dbError: PostgrestError }>;
}

export async function getAllCommoditiesWithBatches(): Promise<{
  dbData: ReadCommodityWithBatchesType[];
  dbError: PostgrestError;
}> {
  let dbData: ReadCommodityWithBatchesType[], dbError: PostgrestError, dbDataBatches: ReadCommodityBatchDBType[];
  ({ dbData, dbError } = (await getAllRecords("commodity")) as {
    dbData: ReadCommodityWithBatchesType[];
    dbError: PostgrestError;
  });
  if (dbError) return { dbData, dbError };

  ({ dbData: dbDataBatches, dbError } = (await getAllRecords("commodity_batch")) as {
    dbData: ReadCommodityBatchDBType[];
    dbError: PostgrestError;
  });

  dbData = dbData.map((item) => {
    const commodityBatches = dbDataBatches.filter(({ commodity_id }) => item.id === commodity_id);
    return { ...item, batches: commodityBatches };
  });
  return { dbData, dbError };
}

export async function getSingleCommodity(id: number) {
  return getsingleRecord("commodity", id) as Promise<{ dbData: ReadCommodityDBType; dbError: PostgrestError }>;
}

export async function deleteCommodity(id: number) {
  return deleteRecord("commodity", id);
}
