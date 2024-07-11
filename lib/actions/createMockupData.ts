"use server";

import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { connectAndRedirect, withErrorHandling } from "../db/supabaseUtils";
import { DBError } from "../errors";
import {
  CreateProductBatchDBType,
  CreateProductBatchIngredientDBType,
  CreateProductIngredientDBType,
  ReadClientDBType,
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
  ReadProductBatchDBType,
  ReadProductBatchIngredientDBType,
  ReadProductDBType,
  ReadProductIngredientDBType,
  ReadSaleDBType,
  ReadSaleIngredientDBType,
  ReadSupplierDBType,
} from "../types/types";
import {
  getMockupCommodityBatches,
  getMockupProductBatches,
  getMockupProductBatchIngredients,
  getMockupProductIngredients,
  getMockupSaleIngredients,
  getMockupSales,
  MockupClient,
  mockupClients,
  mockupCommodities,
  MockupCommodity,
  MockupCommodityBatch,
  MockupProduct,
  mockupProducts,
  MockupSale,
  MockupSaleIngredient,
  MockupSupplier,
  mockupSuppliers,
} from "../db/mockupData";

export async function createMockupData(): Promise<{
  dbError: PostgrestError | null;
}> {
  const supabase: SupabaseClient = await connectAndRedirect();
  const dbError: PostgrestError | null = null;
  try {
    // COMMODITIES:
    const { dbData: commoditiesData, dbError: commoditiesError } = await upsertCommodities(supabase, mockupCommodities);
    if (commoditiesError) throw new DBError(commoditiesError?.message || "Something went wrong");

    // SUPPLIERS:
    const { dbData: suppliersData, dbError: supplierError } = await upsertSuppliers(supabase, mockupSuppliers);
    if (supplierError) throw new DBError(supplierError?.message || "Something went wrong");

    // COMMODITY BATCHES:
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

    // PRODUCTS
    const { dbData: productsData, dbError: productsError } = await upsertProducts(supabase, mockupProducts);
    if (productsError) throw new DBError(productsError?.message || "Something went wrong");

    // PRODUCT INGREDIENTS
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

    // PRODUCT BATCHES
    const mockupProductBatches = getMockupProductBatches({
      productsData,
      mockupProducts,
    });
    const { dbData: productBatchesData, dbError: productBatchesError } = await upsertProductBatches(
      supabase,
      mockupProductBatches
    );
    if (productBatchesError) throw new DBError(productBatchesError?.message || "Something went wrong");

    // PRODUCT BATCH INGREDIENTS
    const mockupProductBatchIngredients = getMockupProductBatchIngredients({
      productBatchesData,
      commodityBatchesData,
      mockupProductBatches,
      mockupCommodityBatches,
    });
    const { dbData: productBatchIngredientsData, dbError: productBatchIngredientsError } =
      await upsertProductBatchIngredients(supabase, mockupProductBatchIngredients);
    if (productBatchIngredientsError)
      throw new DBError(productBatchIngredientsError?.message || "Something went wrong");

    // CLIENTS
    const { dbData: clientsData, dbError: clientsError } = await upsertClients(supabase, mockupClients);
    if (clientsError) throw new DBError(clientsError?.message || "Something went wrong");

    const mockupSales = getMockupSales({ clientsData, mockupClients });
    const { dbData: salesData, dbError: salesError } = await upsertSales(supabase, mockupSales);
    if (salesError) throw new DBError(salesError?.message || "Something went wrong");

    const mockupSaleIngredients = getMockupSaleIngredients({
      salesData,
      productBatchesData,
      mockupProductBatches,
      commodityBatchesData,
      mockupCommodityBatches,
    });
    const { dbData: saleIngredientsData, dbError: saleIngredientsError } = await upsertSaleIngredients(
      supabase,
      mockupSaleIngredients
    );
    if (saleIngredientsError) throw new DBError(saleIngredientsError?.message || "Something went wrong");

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
  dbData: ReadProductIngredientDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("product_ingredients")
      .upsert(mockupProductIngredients)
      .select("*")
      .returns<ReadProductIngredientDBType[]>()
  );
}

export async function upsertProductBatches(
  supabase: SupabaseClient,
  mockupProductBatches: CreateProductBatchDBType[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchDBType[] | null;
}> {
  return withErrorHandling(
    supabase.from("product_batches").upsert(mockupProductBatches).select("*").returns<ReadProductBatchDBType[]>()
  );
}

export async function upsertProductBatchIngredients(
  supabase: SupabaseClient,
  mockupProductBatchIngredients: CreateProductBatchIngredientDBType[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadProductBatchIngredientDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("product_batch_ingredients")
      .upsert(mockupProductBatchIngredients)
      .select("*")
      .returns<ReadProductBatchIngredientDBType[]>()
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

export async function upsertSales(
  supabase: SupabaseClient,
  mockupSales: MockupSale[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleDBType[] | null;
}> {
  return withErrorHandling(supabase.from("sales").upsert(mockupSales).select("*").returns<ReadSaleDBType[]>());
}

export async function upsertClients(
  supabase: SupabaseClient,
  mockupClients: MockupClient[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadClientDBType[] | null;
}> {
  return withErrorHandling(
    supabase
      .from("clients")
      .upsert(mockupClients, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadClientDBType[]>()
  );
}

export async function upsertSaleIngredients(
  supabase: SupabaseClient,
  mockupSaleIngredients: MockupSaleIngredient[]
): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSaleIngredientDBType[] | null;
}> {
  return withErrorHandling(
    supabase.from("sale_ingredients").upsert(mockupSaleIngredients).select("*").returns<ReadSaleIngredientDBType[]>()
  );
}
