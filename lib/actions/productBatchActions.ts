"use server";

import { ProductBatchFormValueType, ReadProductBatchDBType } from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  connectAndRedirect,
  deleteSingleRecordById,
  getAllRecords,
  createRecord,
  updateRecord,
  getRecordsByFieldArray,
  getRecordsByField,
  withErrorHandling,
} from "../db/supabaseUtils";

function formToDatabaseFn({ values, userId }: { values: ProductBatchFormValueType; userId: string }) {
  return {
    product_id: parseInt(values.productId),
    date: values.date.toISOString(),
    initial_amount: values.initialAmount,
    external_id: values.externalId,
    comments: values.comments,
    user_id: userId,
  };
}

export async function createProductBatch({ values }: { values: ProductBatchFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType | null;
}> {
  return createRecord({
    values,
    tableName: "product_batches",
    formToDatabaseFn,
  });
}

export async function updateProductBatch({
  values,
  recordId,
}: {
  values: ProductBatchFormValueType;
  recordId: number;
}): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "product_batches",
    formToDatabaseFn,
    recordId,
  });
}

export async function deleteProductBatch({ recordId }: { recordId: number }) {
  return deleteSingleRecordById({ tableName: "product_batches", recordId });
}

export async function getAllProductBatches(): Promise<{
  dbData: ReadProductBatchDBType[] | null;
  dbError: PostgrestError | null;
}> {
  return getAllRecords({ tableName: "product_batches" });
}

export async function getProductBatchesByProductIdArray({
  recordIds,
}: {
  recordIds: number[];
}): Promise<{ dbData: ReadProductBatchDBType[] | null; dbError: PostgrestError | null }> {
  return getRecordsByFieldArray({ tableName: "product_batches", fieldName: "product_id", fieldValues: recordIds });
}

export async function getProductBatchesByProductId({
  recordId,
}: {
  recordId: number;
}): Promise<{ dbData: ReadProductBatchDBType[] | null; dbError: PostgrestError | null }> {
  return getRecordsByField({ tableName: "product_batches", fieldName: "product_id", fieldValue: recordId });
}

export async function getProductId({
  productBatchId,
}: {
  productBatchId: number;
}): Promise<{ dbError: PostgrestError | null; dbData: { id: number } | null }> {
  const supabase = await connectAndRedirect();
  return withErrorHandling(
    supabase.from("product_batches").select("product_id").eq("id", productBatchId).maybeSingle()
  );
}
