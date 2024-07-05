"use server";

import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { connectAndRedirect, withErrorHandling } from "../supabaseUtils";
import { DBError } from "../errors";
import {
  CreateClientDBType,
  CreateCommodityDBType,
  CreateSupplierDBType,
  ReadClientDBType,
  ReadCommodityDBType,
  ReadSupplierDBType,
} from "../types";

export async function createMockupData(): Promise<{
  dbError: PostgrestError | null;
}> {
  console.log("Creating mockup data");
  const supabase: SupabaseClient = await connectAndRedirect();
  const dbError: PostgrestError | null = null;
  try {
    const { dbData: commoditiesData, dbError: commoditiesError } = await upsertCommodities(supabase);
    if (commoditiesError) throw new DBError(commoditiesError?.message || "Something went wrong");

    const { dbData: clientsData, dbError: clientsError } = await upsertClients(supabase);
    if (clientsError) throw new DBError(clientsError?.message || "Something went wrong");

    const { dbData: suppliersData, dbError: supplierError } = await upsertSuppliers(supabase);
    if (supplierError) throw new DBError(supplierError?.message || "Something went wrong");

    console.log("Commodities: ", commoditiesData);
    console.log("Clients: ", clientsData);
    console.log("Suppliers: ", suppliersData);
  } catch (e) {
    if (e instanceof DBError) {
      console.error(e.message);
    } else {
      console.error("Something went wrong");
    }
  }

  return { dbError };
}
export async function upsertCommodities(supabase: SupabaseClient): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadCommodityDBType | null;
}> {
  return withErrorHandling(
    supabase
      .from("commodities")
      .upsert(mockupCommodities, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadCommodityDBType>()
  );
}

export async function upsertSuppliers(supabase: SupabaseClient): Promise<{
  dbError: PostgrestError | null;
  dbData: ReadSupplierDBType | null;
}> {
  return withErrorHandling(
    supabase
      .from("suppliers")
      .upsert(mockupSuppliers, { onConflict: "name, user_id", ignoreDuplicates: true })
      .select("*")
      .returns<ReadSupplierDBType>()
  );
}

export async function upsertClients(supabase: SupabaseClient): Promise<{
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

const mockupCommodities: CreateCommodityDBType[] = [
  { name: "Manzanas", external_id: "MA-xbr", unit: "kg" },
  { name: "Peras", external_id: "PE-xsr", unit: "kg" },
  { name: "Azúcar", external_id: "AZ-cre", unit: "kg" },
  { name: "Harina", external_id: "HA-tt2", unit: "kg" },
  { name: "Levadura", external_id: "LE-4r3", unit: "mg" },
  { name: "Vino dulce", external_id: "VD-jop", unit: "l" },
];

const mockupClients: CreateClientDBType[] = [
  { name: "Jorge Gutiérrez", email: "jorge@gutieres.com", address: "C/ de los Olmos, sn", phone: "657439802" },
  { name: "Ana Martínez", email: "ana.martinez@gmail.com", address: "C/ de la Luna, 91", phone: "678901234" },
  {
    name: "Pedro Ruiz",
    email: "pedro.ruiz@hotmail.com",
    address: "C/ de la Estrella, 43",
    phone: "612345678",
    comments: "Es alérgico al calamar",
  },
  { name: "María Pérez", email: "maria.perez@yahoo.com", address: "C/ de la Fuente, sn", phone: "698765432" },
  {
    name: "Isabel García",
    email: "isabel.garcia@outlook.com",
    address: "C/ de la Montaña Pelada, 53",
    phone: "632109876",
  },
];

const mockupSuppliers: CreateSupplierDBType[] = [
  { name: "Harinas la Mancha", email: "harinas@lamancha.com", address: "C/ del Molino, 43", phone: "657439802" },
  { name: "Fruver S.L.", email: "fruver@fruver.com", address: "C/ de la Cruz, 23", phone: "678901234" },
  {
    name: "Fruterías El Bosque",
    email: "fruterias@elbosque.com",
    address: "C/ de la Paz, 53",
    phone: "612345678",
    comments: "Reparten a partir de las 3 de la tarde",
  },
  { name: "Vinos de Castilla", email: "vinos@castilla.com", address: "C/ de la Alhambra, 91", phone: "698765432" },
  {
    name: "Panadería La Campiña",
    email: "panaderia@lacampina.com",
    address: "C/ de la Catedral, 33",
    phone: "632109876",
  },
];
