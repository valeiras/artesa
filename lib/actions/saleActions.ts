"use server";

import { ReadSaleDBType, ReadSaleType, SaleFormValueType } from "../types/types";
import { PostgrestError } from "@supabase/supabase-js";
import {
  getSingleRecordById,
  deleteSingleRecordById,
  createRecord,
  updateRecord,
  connectAndRedirect,
  withErrorHandling,
} from "../db/supabaseUtils";

const formToDatabaseFn = ({ values, userId }: { values: SaleFormValueType; userId: string }) => {
  return {
    user_id: userId,
    client_id: parseInt(values.clientId),
    date: values.date.toISOString(),
    comments: values.comments,
    external_id: values.externalId,
  };
};

export async function createSale({ values }: { values: SaleFormValueType }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  return createRecord({
    values,
    tableName: "sales",
    formToDatabaseFn,
  });
}

export async function updateSale({ values, recordId }: { values: SaleFormValueType; recordId: number }): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType | null;
}> {
  return updateRecord({
    values,
    tableName: "sales",
    formToDatabaseFn,
    recordId,
  });
}

export async function getAllSales(): Promise<{ dbData: ReadSaleType[] | null; dbError: PostgrestError | null }> {
  const supabase = await connectAndRedirect();

  return withErrorHandling(
    supabase.from("sales").select(
      `*, clients(name), 
        sale_ingredients(sold_amount, commodity_batches(external_id, id, commodities(name, id)),  
                         product_batches(external_id, id, products(name, id)))`
    )
  );
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
