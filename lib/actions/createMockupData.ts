"use server";

import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { connectAndRedirect, withErrorHandling } from "../supabaseUtils";
import { DBError } from "../errors";
import {
  CreateClientDBType,
  CreateCommodityBatchDBType,
  CreateCommodityDBType,
  CreateProductDBType,
  CreateProductIngredientDBType,
  CreateSupplierDBType,
  ReadClientDBType,
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
  ReadProductDBType,
  ReadSupplierDBType,
} from "../types";
import {
  getMockupCommodityBatches,
  getMockupProductIngredients,
  MockupClient,
  mockupClients,
  mockupCommodities,
  MockupCommodity,
  MockupCommodityBatch,
  MockupProduct,
  mockupProducts,
  MockupSupplier,
  mockupSuppliers,
} from "../mockupData";

export async function createMockupData(): Promise<{
  dbError: PostgrestError | null;
}> {
  console.log("Creating mockup data");
  const supabase: SupabaseClient = await connectAndRedirect();
  const dbError: PostgrestError | null = null;
  try {
    const { dbData: commoditiesData, dbError: commoditiesError } = await upsertCommodities(supabase, mockupCommodities);
    if (commoditiesError) throw new DBError(commoditiesError?.message || "Something went wrong");

    const { dbData: suppliersData, dbError: supplierError } = await upsertSuppliers(supabase, mockupSuppliers);
    if (supplierError) throw new DBError(supplierError?.message || "Something went wrong");

    const mockupCommodityBatches = getMockupCommodityBatches({
      commoditiesData,
      suppliersData,
      mockupCommodities,
      mockupSuppliers,
    });
    const { dbData: commodityBatchesData, dbError: commodityBatchesError } = await upsertCommodityBatches(
      supabase,
      mockupCommodityBatches
    );
    if (commodityBatchesError) throw new DBError(commodityBatchesError?.message || "Something went wrong");

    const { dbData: productsData, dbError: productsError } = await upsertProducts(supabase, mockupProducts);
    if (productsError) throw new DBError(productsError?.message || "Something went wrong");

    const mockupProductIngredients = getMockupProductIngredients({
      commoditiesData,
      productsData,
      mockupCommodities,
      mockupProducts,
    });
    const { dbData: productIngredientsData, dbError: productIngredientsError } = await upsertProductIngredients(
      supabase,
      mockupProductIngredients
    );
    if (productIngredientsError) throw new DBError(productIngredientsError?.message || "Something went wrong");

    const { dbData: clientsData, dbError: clientsError } = await upsertClients(supabase, mockupClients);
    if (clientsError) throw new DBError(clientsError?.message || "Something went wrong");

    // console.log("Commodities: ", commoditiesData);
    // console.log("Products: ", productsData);
    // console.log("Product Ingredients: ", productIngredientsData);
    // console.log("Clients: ", clientsData);
    // console.log("Suppliers: ", suppliersData);
  } catch (e) {
    if (e instanceof DBError) {
      console.error(e.message);
    } else {
      console.error("Something went wrong");
    }
  }

  return { dbError };
}
export async function upsertCommodities(
  supabase: SupabaseClient,
  mockupCommodities: MockupCommodity[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("commodities")
      .upsert(mockupCommodities, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadCommodityDBType[]>()
  );
}

export async function upsertCommodityBatches(
  supabase: SupabaseClient,
  mockupCommodityBatches: MockupCommodityBatch[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityBatchDBType[] | null;
}> {
  return withErrorHandling(
    supabase.from("commodity_batches").upsert(mockupCommodityBatches).select("*").returns<ReadCommodityBatchDBType[]>()
  );
}

export async function upsertProducts(
  supabase: SupabaseClient,
  mockupProducts: MockupProduct[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("products")
      .upsert(mockupProducts, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadProductDBType[]>()
  );
}

export async function upsertProductIngredients(
  supabase: SupabaseClient,
  mockupProductIngredients: CreateProductIngredientDBType[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityDBType[] | null;
}> {
  return withErrorHandling(
    supabase.from("product_ingredients").upsert(mockupProductIngredients).select("*").returns<ReadCommodityDBType[]>()
  );
}

export async function upsertSuppliers(
  supabase: SupabaseClient,
  mockupSuppliers: MockupSupplier[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("suppliers")
      .upsert(mockupSuppliers, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadSupplierDBType[]>()
  );
}

export async function upsertClients(
  supabase: SupabaseClient,
  mockupClients: MockupClient[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType | null;
}> {
  return withErrorHandling(
    supabase
      .from("clients")
      .upsert(mockupClients, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadClientDBType>()
  );
}
