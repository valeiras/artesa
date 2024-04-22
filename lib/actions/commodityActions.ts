"use server";

import { CreateCommodityDBType, ReadCommodityDBType, UpdateCommodityDBType, CommodityFormType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  authenticateAndRedirect,
  connectAndRedirect,
  getAllRecords,
  getsingleRecord,
  deleteRecord,
} from "../supabaseUtils";

export async function createCommodity(values: CommodityFormType): Promise<{
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
  values: CommodityFormType,
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

export async function getSingleCommodity(id: number) {
  return getsingleRecord("commodity", id) as Promise<{ dbData: ReadCommodityDBType; dbError: PostgrestError }>;
}

export async function deleteCommodity(id: number) {
  return deleteRecord("commodity", id);
}
