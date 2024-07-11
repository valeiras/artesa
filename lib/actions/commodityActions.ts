"use server";

import {
  ReadCommodityDBType,
  CommodityFormValueType,
  ReadCommodityWithBatchesType,
  ReadCommodityWithBatchesAndAmountsType,
} from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
  withErrorHandling,
} from "../db/supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: CommodityFormValueType; userId: string }) {
  return { name: values.name, unit: values.unit, external_id: values.externalId, user_id: userId };
}

export async function createCommodity({ values }: { values: CommodityFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityDBType | null;
}> {
  return createRecord({
    values,
    tableName: "commodities",
    formToDatabaseFn,
  });
}

export async function updateCommodity({
  values,
  recordId,
}: {
  values: CommodityFormValueType;
  recordId: number;
}): Promise<{
  dbError: PostgrestError | null;
}> {
  return updateRecord({
    values,
    tableName: "commodities",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllCommodities(): Promise<{
  dbData: ReadCommodityDBType[] | null;
  dbError: PostgrestError | null;
}> {
  return getAllRecords({ tableName: "commodities" });
}

export async function getAllCommoditiesWithBatches(): Promise<{
  dbData: ReadCommodityWithBatchesType[] | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(supabase.from("commodities").select(`*, batches:commodity_batches (*)`));
}

export async function getSingleCommodityWithBatches({ recordId }: { recordId: number }): Promise<{
  dbData: ReadCommodityWithBatchesAndAmountsType | null;
  dbError: PostgrestError | null;
}> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(
    supabase
      .from("commodities")
      .select(
        `*, batches:commodity_batches(
          *, 
          commodity:commodities(name, unit),
          supplier:suppliers(name),
          containing_product_batches:product_batch_ingredients(used_amount, product_batch:product_batches!product_batch_id(date, external_id)),
          containing_sales:sale_ingredients(sold_amount, sale:sales(id, date, client:clients(name)))
        )
        `
      )
      .eq("id", recordId)
      .maybeSingle()
  );
}

export async function getSingleCommodity({ recordId }: { recordId: number }): Promise<{
  dbData: ReadCommodityDBType | null;
  dbError: PostgrestError | null;
}> {
  return getSingleRecordById({ tableName: "commodities", recordId });
}

export async function deleteCommodity({ recordId }: { recordId: number }): Promise<{ dbError: PostgrestError | null }> {
  return deleteSingleRecordById({ tableName: "commodities", recordId });
}
