"use server";

import { ReadSaleDBType, SaleFormValueType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  getAllRecords,
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
} from "../supabaseUtils";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";

const getBatchIds = (batchId: string) => {
  const commodityBatchId = batchId.startsWith(COMMODITY_PREFIX)
    ? parseInt(batchId.replace(COMMODITY_PREFIX, ""))
    : null;
  const productBatchId = batchId.startsWith(PRODUCT_PREFIX) ? parseInt(batchId.replace(PRODUCT_PREFIX, "")) : null;

  return { commodityBatchId, productBatchId };
};

const formToDatabaseFn = ({
  commodityBatchId,
  productBatchId,
}: {
  commodityBatchId: number | null;
  productBatchId: number | null;
}) => {
  return ({ values, userId }: { values: SaleFormValueType; userId: string }) => {
    return {
      user_id: userId,
      commodity_batch_id: commodityBatchId,
      product_batch_id: productBatchId,
      sold_amount: values.amount,
      client_id: parseInt(values.clientId),
      date: values.date.toISOString(),
    };
  };
};

export async function createSale({ values }: { values: SaleFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  const { commodityBatchId, productBatchId } = getBatchIds(values.batchId);

  return createRecord({
    values,
    tableName: "sales",
    formToDatabaseFn: formToDatabaseFn({ commodityBatchId, productBatchId }),
  });
}

export async function updateSale({ values, recordId }: { values: SaleFormValueType; recordId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  const { commodityBatchId, productBatchId } = getBatchIds(values.batchId);

  return updateRecord({
    values,
    tableName: "sales",
    formToDatabaseFn: formToDatabaseFn({ commodityBatchId, productBatchId }),
    recordId,
  });
}

export async function getAllSales(): Promise<{ dbData: ReadSaleDBType[] | null; dbError: PostgrestError | null }> {
  return getAllRecords({ tableName: "sales" });
}

export async function getSingleSale({ recordId }: { recordId: number }): Promise<{
  dbData: ReadSaleDBType | null;
  dbError: PostgrestError | null;
}> {
  return getSingleRecordById({ tableName: "sales", recordId });
}

export async function deleteSale({ recordId }: { recordId: number }): Promise<{ dbError: PostgrestError | null }> {
  return deleteSingleRecordById({ tableName: "sales", recordId });
}
