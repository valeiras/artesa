"use server";

import {
  CreateCommodityBatchDBType,
  ReadCommodityBatchDBType,
  UpdateCommodityBatchDBType,
  CommodityBatchFormType,
} from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

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

// export async function updateCommodity(
//   values: CommodityBatchFormType,
//   id: number
// ): Promise<{
//   dbError: PostgrestError | null;
// }> {
//   const userId = await authenticateAndRedirect();
//   const supabase = await connectAndRedirect();
//   const updatedCommodity: UpdateCommodityBatchDBType = {
//     name: values.name,
//     unit: values.unit,
//     user_id: userId,
//   };

//   const { error: dbError } = await supabase.from("commodity").update(updatedCommodity).eq("id", id);
//   return { dbError };
// }

// export async function getAllCommodities() {
//   return getAllRecords("commodity") as Promise<{ dbData: ReadCommodityDBType[]; dbError: PostgrestError }>;
// }

// export async function getAllCommoditiesWithBatches(): Promise<{
//   dbData: ReadCommodityWithBatches[];
//   dbError: PostgrestError;
// }> {
//   let dbData: ReadCommodityWithBatches[], dbError: PostgrestError, dbDataBatches: ReadCommodityBatchDBType[];
//   ({ dbData, dbError } = (await getAllRecords("commodity")) as {
//     dbData: ReadCommodityWithBatches[];
//     dbError: PostgrestError;
//   });
//   if (dbError) return { dbData, dbError };

//   ({ dbData: dbDataBatches, dbError } = (await getAllRecords("commodity_batch")) as {
//     dbData: ReadCommodityBatchDBType[];
//     dbError: PostgrestError;
//   });

//   dbData = dbData.map((item) => {
//     const commodityBatches = dbDataBatches.filter(({ commodity_id }) => item.id === commodity_id);
//     return { ...item, batches: commodityBatches };
//   });
//   return { dbData, dbError };
// }

// export async function getSingleCommodity(id: number) {
//   return getsingleRecord("commodity", id) as Promise<{ dbData: ReadCommodityDBType; dbError: PostgrestError }>;
// }

// export async function deleteCommodity(id: number) {
//   return deleteRecord("commodity", id);
// }
