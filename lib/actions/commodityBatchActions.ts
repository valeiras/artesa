"use server";

import {
  CommodityBatchFormValueType,
  ReadCommodityBatchDBType,
  ReadCommodityBatchWithAmountsType,
} from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  createRecord,
  deleteSingleRecordById,
  getAllRecords,
  getRecordsByField,
  getRecordsByFieldArray,
  updateRecord,
  withErrorHandling,
} from "../db/supabaseUtils";

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

export async function getSingleCommodityBatch({ externalId }: { externalId: string }): Promise<{
  dbData: ReadCommodityBatchWithAmountsType | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(
    supabase
      .from("commodity_batches")
      .select(
        `*,
          commodity:commodities(name, unit),
          supplier:suppliers(name),
          containing_product_batches:product_batch_ingredients(used_amount, product_batch:product_batches!product_batch_id(date, external_id)),
          containing_sales:sale_ingredients(sold_amount, sale:sales(id, date, client:clients(name)))
        `
      )
      .eq("external_id", externalId)
      .maybeSingle()
  );
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

export async function getCommodityBatchesByCommodityIdArray({
  recordIds,
}: {
  recordIds: number[];
}): Promise<{ dbData: ReadCommodityBatchDBType[] | null; dbError: PostgrestError | null }> {
  return getRecordsByFieldArray({ tableName: "commodity_batches", fieldName: "commodity_id", fieldValues: recordIds });
}

export async function getCommodityBatchesByCommodityId({
  recordId,
}: {
  recordId: number;
}): Promise<{ dbData: ReadCommodityBatchDBType[] | null; dbError: PostgrestError | null }> {
  return getRecordsByField({ tableName: "commodity_batches", fieldName: "commodity_id", fieldValue: recordId });
}

export async function getCommodityId({
  commodityBatchId,
}: {
  commodityBatchId: number;
}): Promise<{ dbError: PostgrestError | null; dbData: { id: number } | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(
    supabase.from("commodity_batches").select("commodity_id").eq("id", commodityBatchId).maybeSingle()
  );
}
