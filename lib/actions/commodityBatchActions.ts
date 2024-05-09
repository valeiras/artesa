"use server";

import { CommodityBatchFormValueType, ReadCommodityBatchDBType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  createRecord,
  deleteSingleRecordById,
  getAllRecords,
  getRecordsByFieldArray,
  getRecordsByIdArray,
  updateRecord,
} from "../supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: CommodityBatchFormValueType; userId: string }) {
  return {
    commodity_id: values.commodityId,
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    supplier_id: parseInt(values.supplierId),
    comments: values.comments,
    user_id: userId,
  };
}

export async function createCommodityBatch({ values }: { values: CommodityBatchFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityBatchDBType | null;
}> {
  return createRecord({
    values,
    tableName: "commodity_batches",
    formToDatabaseFn,
  });
}

export async function updateCommodityBatch({
  values,
  recordId,
}: {
  values: CommodityBatchFormValueType;
  recordId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityBatchDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "commodity_batches",
    formToDatabaseFn,
    recordId,
  });
}

export async function deleteCommodityBatch({ recordId }: { recordId: number }) {
  return deleteSingleRecordById({ tableName: "commodity_batches", recordId });
}

export async function getAllCommodityBatches(): Promise<{
  dbData: ReadCommodityBatchDBType[] | null;
  dbError: PostgrestError | null;
}> {
  return getAllRecords({ tableName: "commodity_batches" });
}

export async function getCommodityBatchesByIds({
  recordIds,
}: {
  recordIds: number[];
}): Promise<{ dbData: ReadCommodityBatchDBType[] | null; dbError: PostgrestError | null }> {
  return getRecordsByFieldArray({ tableName: "commodity_batches", fieldName: "commodity_id", fieldValues: recordIds });
}

export async function getCommodityId({
  commodityBatchId,
}: {
  commodityBatchId: number;
}): Promise<{ dbError: PostgrestError | null; dbData: { id: number } | null }> {
  const supabase = await connectAndRedirect();
  let dbError: PostgrestError | null = null;
  let dbData: { id: number } | null = null;

  try {
    ({ error: dbError, data: dbData } = await supabase
      .from("commodity_batches")
      .select("commodity_id")
      .eq("id", commodityBatchId)
      .maybeSingle());
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  }
  return { dbError, dbData };
}
