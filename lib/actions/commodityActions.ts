"use server";

import { ReadCommodityDBType, CommodityFormValueType, ReadCommodityWithBatchesType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
} from "../supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: CommodityFormValueType; userId: string }) {
  return { name: values.name, unit: values.unit, user_id: userId };
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

  let dbData: ReadCommodityWithBatchesType[] | null = null;
  let dbError: PostgrestError | null = null;

  try {
    ({ data: dbData, error: dbError } = await supabase.from("commodities").select(`*, batches:commodity_batches (*)`));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbData, dbError };
  }
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
