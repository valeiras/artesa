"use server";

import { CreateSaleDBType, ReadSaleDBType, UpdateSaleDBType, SaleFormValueType } from "../types";
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
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

const getBatchIds = (batchId: string) => {
  const commodityBatchId = batchId.startsWith(COMMODITY_PREFIX)
    ? parseInt(batchId.replace(COMMODITY_PREFIX, ""))
    : null;
  const productBatchId = batchId.startsWith(PRODUCT_PREFIX) ? parseInt(batchId.replace(PRODUCT_PREFIX, "")) : null;

  return { commodityBatchId, productBatchId };
};

export async function createSale({ values }: { values: SaleFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  const { commodityBatchId, productBatchId } = getBatchIds(values.batchId);

  return createRecord({
    values,
    tableName: "sale",
    formToDatabaseFn: (values, userId) => {
      return {
        user_id: userId,
        commodity_batch_id: commodityBatchId,
        product_batch_id: productBatchId,
        sold_amount: values.amount,
        client_id: parseInt(values.clientId),
        date: values.date.toISOString(),
      };
    },
  });
}

export async function updateSale(
  values: SaleFormValueType,
  id: number
): Promise<{
  dbError: PostgrestError | null;
}> {
  const userId = await authenticateAndRedirect();
  const supabase = await connectAndRedirect();

  const { commodityBatchId, productBatchId } = getBatchIds(values.batchId);
  const updatedSale: UpdateSaleDBType = {
    user_id: userId,
    commodity_batch_id: commodityBatchId,
    product_batch_id: productBatchId,
    sold_amount: values.amount,
    client_id: parseInt(values.clientId),
    date: values.date.toISOString(),
  };

  const { error: dbError } = await supabase.from("sale").update(updatedSale).eq("id", id);
  return { dbError };
}

export async function getAllSales() {
  return getAllRecords("sale") as Promise<{ dbData: ReadSaleDBType[]; dbError: PostgrestError }>;
}

export async function getSingleSale(id: number) {
  return getSingleRecordById("sale", id) as Promise<{ dbData: ReadSaleDBType; dbError: PostgrestError }>;
}

export async function deleteSale(id: number) {
  return deleteSingleRecordById("sale", id);
}
