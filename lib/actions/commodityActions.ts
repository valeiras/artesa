"use server";

import {
  CreateCommodityDBType,
  ReadCommodityDBType,
  ReadCommodityBatchDBType,
  UpdateCommodityDBType,
  CommodityFormValueType,
  ReadCommodityWithBatchesType,
} from "../types";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  checkPermissionsAndRedirect,
  createRecord,
} from "../supabaseUtils";
import { deleteAllCommodityBatchesByCommodityId, getAllCommodityBatches } from "./commodityBatchActions";

export async function createCommodity({
  values,
  supabase,
}: {
  values: CommodityFormValueType;
  supabase?: SupabaseClient;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityDBType | null;
}> {
  return createRecord({
    values,
    supabase,
    tableName: "commodity",
    formToDatabaseFn: (values, userId) => {
      return { name: values.name, unit: values.unit, user_id: userId };
    },
  });
}

export async function updateCommodity(
  values: CommodityFormValueType,
  id: number,
  supabase?: SupabaseClient
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  if (!supabase) supabase = await connectAndRedirect();
  const updatedCommodity: UpdateCommodityDBType = {
    name: values.name,
    unit: values.unit,
    user_id: userId,
  };

  const { error: dbError } = await supabase.from("commodity").update(updatedCommodity).eq("id", id);
  return { dbError };
}

export async function getAllCommodities(supabase?: SupabaseClient) {
  return getAllRecords("commodity", supabase) as Promise<{ dbData: ReadCommodityDBType[]; dbError: PostgrestError }>;
}

export async function getAllCommoditiesWithBatches(supabase?: SupabaseClient): Promise<{
  dbData: ReadCommodityWithBatchesType[] | null;
  dbError: PostgrestError | null;
}> {
  if (!supabase) supabase = await connectAndRedirect();

  let dbCommoditys: ReadCommodityDBType[] | null = null;
  let dbData: ReadCommodityWithBatchesType[] | null = null;
  let dbError: PostgrestError | null = null;
  let dbBatches: ReadCommodityBatchDBType[] | null = null;

  try {
    [{ dbData: dbCommoditys, dbError }, { dbData: dbBatches, dbError }] = await Promise.all([
      getAllCommodities(supabase),
      getAllCommodityBatches(supabase),
    ]);

    dbData =
      dbCommoditys?.map((item) => {
        const batches = dbBatches?.filter(({ commodity_id }) => item.id === commodity_id) || [];
        return { ...item, batches };
      }) || null;
  } catch (error) {
    console.log(error);
  }

  return { dbData, dbError };
}

export async function getSingleCommodity(id: number, supabase?: SupabaseClient) {
  return getSingleRecordById("commodity", id, supabase) as Promise<{
    dbData: ReadCommodityDBType;
    dbError: PostgrestError;
  }>;
}

export async function deleteCommodity(
  commodityId: number,
  supabase?: SupabaseClient
): Promise<{ dbError: PostgrestError | null }> {
  if (!supabase) supabase = await connectAndRedirect();
  let dbError: PostgrestError | null = null;

  try {
    ({ dbError } = await deleteAllCommodityBatchesByCommodityId(commodityId, supabase));
    if (dbError) throw new Error(dbError.message);
    ({ dbError } = await deleteSingleRecordById("commodity", commodityId, supabase));
    if (dbError) throw new Error(dbError.message);
  } catch (error) {
    console.log(error);
  } finally {
    return { dbError };
  }
}
