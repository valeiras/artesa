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
  getSingleRecordById,
  deleteRecordById,
} from "../supabaseUtils";
import { getAllCommodityBatches } from "./commodityBatchActions";

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
  ({ dbData, dbError } = await getAllCommodities());
  if (dbError) return { dbData, dbError };

  ({ dbData: dbDataBatches, dbError } = await getAllCommodityBatches());

  dbData = dbData.map((item) => {
    const commodityBatches = dbDataBatches.filter(({ commodity_id }) => item.id === commodity_id);
    return { ...item, batches: commodityBatches };
  });
  return { dbData, dbError };
}

export async function getSingleCommodity(id: number) {
  return getSingleRecordById("commodity", id) as Promise<{ dbData: ReadCommodityDBType; dbError: PostgrestError }>;
}

export async function deleteCommodity(id: number) {
  return deleteRecordById("commodity", id);
}
