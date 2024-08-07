import {
  CreateClientDBType,
  CreateCommodityBatchDBType,
  CreateCommodityDBType,
  CreateProductBatchDBType,
  CreateProductBatchIngredientDBType,
  CreateProductDBType,
  CreateProductIngredientDBType,
  CreateSaleDBType,
  CreateSaleIngredientDBType,
  CreateSupplierDBType,
  ReadClientDBType,
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
  ReadProductBatchDBType,
  ReadProductDBType,
  ReadSaleDBType,
  ReadSupplierDBType,
} from "../types/types";

function getItemId<T extends { id: number }, D>({
  itemData,
  key,
  value,
}: {
  itemData: T[];
  key: keyof T;
  value: D;
}): number | null {
  const idx = itemData.findIndex((c) => c[key] === value);
  if (idx === -1) return null;
  return itemData[idx].id;
}

export type MockupCommodity = Omit<CreateCommodityDBType, "id">;
export const mockupCommodities: MockupCommodity[] = [
  { name: "Manzanas", external_id: "MA-xbr", unit: "kg" },
  { name: "Peras", external_id: "PE-xsr", unit: "kg" },
  { name: "Azúcar", external_id: "AZ-cre", unit: "kg" },
  { name: "Harina", external_id: "HA-tt2", unit: "kg" },
  { name: "Levadura", external_id: "LE-4r3", unit: "mg" },
  { name: "Vino dulce", external_id: "VD-jop", unit: "l" },
];

export type MockupProduct = Omit<CreateProductDBType, "id">;
export const mockupProducts: MockupProduct[] = [
  { name: "Mermelada de manzana", external_id: "MM-ei6", unit: "jar" },
  { name: "Mermelada de pera", external_id: "MP-es2", unit: "jar" },
  { name: "Masa quebrada", external_id: "MQ-es2", unit: "kg" },
  { name: "Tarta de manzana", external_id: "TM-bb2", unit: "unit" },
];

export type MockupClient = Omit<CreateClientDBType, "id">;
export const mockupClients: MockupClient[] = [
  { name: "Jorge Gutiérrez", email: "jorge@gutieres.com", address: "C/ de los Olmos, sn", phone: "657439802" },
  { name: "Ana Martínez", email: "ana.martinez@gmail.com", address: "C/ Dolores Ibárruri, 91", phone: "678901234" },
  {
    name: "Pedro Ruiz",
    email: "pedro.ruiz@hotmail.com",
    address: "C/ Cruz, 43",
    phone: "612345678",
    comments: "Es alérgico al calamar",
  },
  { name: "María Pérez", email: "maria.perez@yahoo.com", address: "C/ Fuente, sn", phone: "698765432" },
  {
    name: "Isabel García",
    email: "isabel.garcia@outlook.com",
    address: "C/ de la Montaña Mágica, 53",
    phone: "632109876",
  },
];

export type MockupSupplier = Omit<CreateSupplierDBType, "id">;
export const mockupSuppliers: MockupSupplier[] = [
  { name: "Harinas la Mancha", email: "harinas@lamancha.com", address: "C/ del Molino, 43", phone: "657439802" },
  { name: "Fruver S.L.", email: "fruver@fruver.com", address: "C/ Cruz, 23", phone: "678901234" },
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
  {
    name: "Suministros María",
    email: "suministros@lamari.com",
    address: "C/ del Oso, 23",
    phone: "632109548",
  },
  {
    name: "Alimentación Jose Luis",
    email: "alientacion@joseluis.com",
    address: "Plaza de los Lobos, sn",
    phone: "667899876",
  },
];

export type MockupProductIngredient = Omit<CreateProductIngredientDBType, "id">;
export function getMockupProductIngredients({
  commoditiesData,
  productsData,
  mockupCommodities,
  mockupProducts,
}: {
  commoditiesData: ReadCommodityDBType[] | null;
  productsData: ReadProductDBType[] | null;
  mockupCommodities: MockupCommodity[];
  mockupProducts: MockupProduct[];
}): MockupProductIngredient[] {
  if (!commoditiesData) return [];
  if (!productsData) return [];

  const commoditiesMap = getItemMapByName(commoditiesData, mockupCommodities);
  const productsMap = getItemMapByName(productsData, mockupProducts);

  const mockupProductIngredients: CreateProductIngredientDBType[] = [
    {
      product_id: productsMap.get("Mermelada de manzana") || 0,
      commodity_ingredient_id: commoditiesMap.get("Manzanas"),
    },
    { product_id: productsMap.get("Mermelada de manzana") || 0, commodity_ingredient_id: commoditiesMap.get("Azúcar") },
    {
      product_id: productsMap.get("Mermelada de manzana") || 0,
      commodity_ingredient_id: commoditiesMap.get("Vino dulce"),
    },
    { product_id: productsMap.get("Mermelada de pera") || 0, commodity_ingredient_id: commoditiesMap.get("Peras") },
    { product_id: productsMap.get("Mermelada de pera") || 0, commodity_ingredient_id: commoditiesMap.get("Azúcar") },
    {
      product_id: productsMap.get("Mermelada de pera") || 0,
      commodity_ingredient_id: commoditiesMap.get("Vino dulce"),
    },
    { product_id: productsMap.get("Masa quebrada") || 0, commodity_ingredient_id: commoditiesMap.get("Harina") },
    { product_id: productsMap.get("Masa quebrada") || 0, commodity_ingredient_id: commoditiesMap.get("Levadura") },
    { product_id: productsMap.get("Tarta de manzana") || 0, commodity_ingredient_id: commoditiesMap.get("Manzanas") },
    {
      product_id: productsMap.get("Tarta de manzana") || 0,
      product_ingredient_id: productsMap.get("Mermelada de manzana"),
    },
    {
      product_id: productsMap.get("Tarta de manzana") || 0,
      product_ingredient_id: productsMap.get("Masa quebrada"),
    },
  ];

  return mockupProductIngredients;
}

export type MockupCommodityBatch = Omit<CreateCommodityBatchDBType, "id">;
export function getMockupCommodityBatches({
  commoditiesData,
  suppliersData,
  mockupCommodities,
  mockupSuppliers,
}: {
  commoditiesData: ReadCommodityDBType[] | null;
  suppliersData: ReadSupplierDBType[] | null;
  mockupCommodities: MockupCommodity[];
  mockupSuppliers: MockupSupplier[];
}): MockupCommodityBatch[] {
  if (!commoditiesData) return [];
  if (!suppliersData) return [];

  const commoditiesMap = getItemMapByName(commoditiesData, mockupCommodities);
  const suppliersMap = getItemMapByName(suppliersData, mockupSuppliers);

  const mockupCommodityBatches: MockupCommodityBatch[] = [
    {
      commodity_id: commoditiesMap.get("Manzanas") || 0,
      supplier_id: suppliersMap.get("Fruterías El Bosque") || 0,
      external_id: "LMA-FEL-221",
      initial_amount: 50,
      date: getDateNDaysAgo(3).toISOString(),
      comments: "Muy maduras",
    },
    {
      commodity_id: commoditiesMap.get("Manzanas") || 0,
      supplier_id: suppliersMap.get("Fruver S.L.") || 0,
      external_id: "LMA-FRU-336",
      initial_amount: 40,
      date: getDateNDaysAgo(9).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Manzanas") || 0,
      supplier_id: suppliersMap.get("Fruterías El Bosque") || 0,
      external_id: "LMA-FEL-222",
      initial_amount: 60,
      date: getDateNDaysAgo(12).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Peras") || 0,
      supplier_id: suppliersMap.get("Fruterías El Bosque") || 0,
      external_id: "LPE-FEL-051",
      initial_amount: 32,
      date: getDateNDaysAgo(35).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Azúcar") || 0,
      supplier_id: suppliersMap.get("Suministros María") || 0,
      external_id: "LAZ-SUM-026",
      initial_amount: 50,
      date: getDateNDaysAgo(50).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Harina") || 0,
      supplier_id: suppliersMap.get("Harinas la Mancha") || 0,
      external_id: "LHA-HLM-554",
      initial_amount: 50,
      date: getDateNDaysAgo(50).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Harina") || 0,
      supplier_id: suppliersMap.get("Panadería La Campiña") || 0,
      external_id: "LHA-PLC-055",
      initial_amount: 100,
      date: getDateNDaysAgo(25).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Levadura") || 0,
      supplier_id: suppliersMap.get("Panadería La Campiña") || 0,
      external_id: "LLE-PLC-055",
      initial_amount: 1000,
      date: getDateNDaysAgo(25).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Vino dulce") || 0,
      supplier_id: suppliersMap.get("Vinos de Castilla") || 0,
      external_id: "LVD-VDC-036",
      initial_amount: 10,
      date: getDateNDaysAgo(75).toISOString(),
    },
    {
      commodity_id: commoditiesMap.get("Vino dulce") || 0,
      supplier_id: suppliersMap.get("Vinos de Castilla") || 0,
      external_id: "LVD-VDC-037",
      initial_amount: 10,
      date: getDateNDaysAgo(25).toISOString(),
    },
  ];

  return mockupCommodityBatches;
}

export type MockupProductBatch = Omit<CreateProductBatchDBType, "id">;
export function getMockupProductBatches({
  productsData,
  mockupProducts,
}: {
  productsData: ReadProductDBType[] | null;
  mockupProducts: MockupProduct[];
}): MockupProductBatch[] {
  if (!productsData) return [];

  const productsMap = getItemMapByName(productsData, mockupProducts);

  const mockupProductBatches: MockupProductBatch[] = [
    {
      product_id: productsMap.get("Mermelada de manzana") || 0,
      external_id: "LMM-FFL-321",
      initial_amount: 20,
      date: getDateNDaysAgo(5).toISOString(),
      comments: "Más dulce de lo habitual",
    },
    {
      product_id: productsMap.get("Mermelada de manzana") || 0,
      external_id: "LMM-FPO-225",
      initial_amount: 15,
      date: getDateNDaysAgo(6).toISOString(),
    },
    {
      product_id: productsMap.get("Mermelada de pera") || 0,
      external_id: "LMP-FOL-021",
      initial_amount: 10,
      date: getDateNDaysAgo(20).toISOString(),
    },
    {
      product_id: productsMap.get("Mermelada de pera") || 0,
      external_id: "LMP-FKL-121",
      initial_amount: 12,
      date: getDateNDaysAgo(15).toISOString(),
    },
    {
      product_id: productsMap.get("Mermelada de pera") || 0,
      external_id: "LMP-GPO-125",
      initial_amount: 15,
      date: getDateNDaysAgo(2).toISOString(),
    },
    {
      product_id: productsMap.get("Masa quebrada") || 0,
      external_id: "LMQ-LOO-214",
      initial_amount: 8,
      date: getDateNDaysAgo(3).toISOString(),
    },
    {
      product_id: productsMap.get("Masa quebrada") || 0,
      external_id: "LMQ-LOL-215",
      initial_amount: 10,
      date: getDateNDaysAgo(15).toISOString(),
    },
    {
      product_id: productsMap.get("Tarta de manzana") || 0,
      external_id: "LTM-LOO-214",
      initial_amount: 5,
      date: getDateNDaysAgo(3).toISOString(),
    },
    {
      product_id: productsMap.get("Tarta de manzana") || 0,
      external_id: "LTM-LOP-215",
      initial_amount: 10,
      date: getDateNDaysAgo(3).toISOString(),
    },
  ];

  return mockupProductBatches;
}

export type MockupProductBatchIngredient = Omit<CreateProductBatchIngredientDBType, "id">;
export function getMockupProductBatchIngredients({
  productBatchesData,
  commodityBatchesData,
  mockupProductBatches,
  mockupCommodityBatches,
}: {
  productBatchesData: ReadProductBatchDBType[] | null;
  commodityBatchesData: ReadCommodityBatchDBType[] | null;
  mockupProductBatches: MockupProductBatch[];
  mockupCommodityBatches: MockupCommodityBatch[];
}): MockupProductBatchIngredient[] {
  if (!productBatchesData) return [];
  if (!commodityBatchesData) return [];

  const productBatchesMap = getItemMapByExternalId(productBatchesData, mockupProductBatches);
  const commodityBatchesMap = getItemMapByExternalId(commodityBatchesData, mockupCommodityBatches);

  const mockupProductBatchIngredients: MockupProductBatchIngredient[] = [
    {
      product_batch_id: productBatchesMap.get("LMM-FFL-321") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LMA-FRU-336") || 0,
      used_amount: 25,
    },
    {
      product_batch_id: productBatchesMap.get("LMM-FFL-321") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LAZ-SUM-026") || 0,
      used_amount: 3,
    },
    {
      product_batch_id: productBatchesMap.get("LMM-FFL-321") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LVD-VDC-037") || 0,
      used_amount: 1,
    },
    {
      product_batch_id: productBatchesMap.get("LMM-FPO-225") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LMA-FEL-222") || 0,
      used_amount: 35,
    },
    {
      product_batch_id: productBatchesMap.get("LMM-FPO-225") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LAZ-SUM-026") || 0,
      used_amount: 2,
    },
    {
      product_batch_id: productBatchesMap.get("LMM-FPO-225") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LVD-VDC-037") || 0,
      used_amount: 3,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FOL-021") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LPE-FEL-051") || 0,
      used_amount: 10,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FOL-021") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LAZ-SUM-026") || 0,
      used_amount: 4,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FOL-021") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LVD-VDC-037") || 0,
      used_amount: 3,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FKL-121") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LPE-FEL-051") || 0,
      used_amount: 9,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FKL-121") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LAZ-SUM-026") || 0,
      used_amount: 4,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-FKL-121") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LVD-VDC-037") || 0,
      used_amount: 2,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-GPO-125") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LPE-FEL-051") || 0,
      used_amount: 4,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-GPO-125") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LAZ-SUM-026") || 0,
      used_amount: 4,
    },
    {
      product_batch_id: productBatchesMap.get("LMP-GPO-125") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LVD-VDC-036") || 0,
      used_amount: 2,
    },
    {
      product_batch_id: productBatchesMap.get("LMQ-LOO-214") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LHA-PLC-055") || 0,
      used_amount: 5,
    },
    {
      product_batch_id: productBatchesMap.get("LMQ-LOO-214") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LLE-PLC-055") || 0,
      used_amount: 200,
    },
    {
      product_batch_id: productBatchesMap.get("LMQ-LOL-215") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LHA-PLC-055") || 0,
      used_amount: 10,
    },
    {
      product_batch_id: productBatchesMap.get("LMQ-LOL-215") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LLE-PLC-055") || 0,
      used_amount: 400,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOO-214") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LMA-FRU-336") || 0,
      used_amount: 5,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOO-214") || 0,
      product_ingredient_batch_id: productBatchesMap.get("LMQ-LOO-214") || 0,
      used_amount: 5,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOO-214") || 0,
      product_ingredient_batch_id: productBatchesMap.get("LMM-FPO-225") || 0,
      used_amount: 2,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOP-215") || 0,
      commodity_ingredient_batch_id: commodityBatchesMap.get("LMA-FRU-336") || 0,
      used_amount: 10,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOP-215") || 0,
      product_ingredient_batch_id: productBatchesMap.get("LMQ-LOL-215") || 0,
      used_amount: 10,
    },
    {
      product_batch_id: productBatchesMap.get("LTM-LOP-215") || 0,
      product_ingredient_batch_id: productBatchesMap.get("LMM-FPO-225") || 0,
      used_amount: 4,
    },
  ];

  return mockupProductBatchIngredients;
}

export type MockupSale = Omit<CreateSaleDBType, "id">;
export function getMockupSales({
  clientsData,
  mockupClients,
}: {
  clientsData: ReadClientDBType[] | null;
  mockupClients: MockupClient[];
}): MockupSale[] {
  if (!clientsData) return [];

  const clientsMap = getItemMapByName(clientsData, mockupClients);

  const mockupSales: MockupSale[] = [
    { date: getDateNDaysAgo(5).toISOString(), client_id: clientsMap.get("Jorge Gutiérrez") || 0 },
    { date: getDateNDaysAgo(1).toISOString(), client_id: clientsMap.get("María Pérez") || 0 },
    { date: getDateNDaysAgo(1).toISOString(), client_id: clientsMap.get("María Pérez") || 0 },
    { date: getDateNDaysAgo(7).toISOString(), client_id: clientsMap.get("Pedro Ruiz") || 0 },
    { date: getDateNDaysAgo(3).toISOString(), client_id: clientsMap.get("Pedro Ruiz") || 0 },
    { date: getDateNDaysAgo(2).toISOString(), client_id: clientsMap.get("Pedro Ruiz") || 0 },
    { date: getDateNDaysAgo(1).toISOString(), client_id: clientsMap.get("Isabel García") || 0 },
  ];

  return mockupSales;
}

export type MockupSaleIngredient = Omit<CreateSaleIngredientDBType, "id">;
export function getMockupSaleIngredients({
  salesData,
  commodityBatchesData,
  productBatchesData,
  mockupCommodityBatches,
  mockupProductBatches,
}: {
  salesData: ReadSaleDBType[] | null;
  commodityBatchesData: ReadCommodityBatchDBType[] | null;
  productBatchesData: ReadProductBatchDBType[] | null;
  mockupCommodityBatches: MockupCommodityBatch[];
  mockupProductBatches: MockupProductBatch[];
}): MockupSaleIngredient[] {
  if (!salesData || !commodityBatchesData || !productBatchesData) return [];

  const commodityBatchesMap = getItemMapByExternalId(commodityBatchesData, mockupCommodityBatches);
  const productBatchesMap = getItemMapByExternalId(productBatchesData, mockupProductBatches);

  const mockupSaleIngredients: MockupSaleIngredient[] = [
    { sale_id: salesData[0].id, sold_amount: 3, product_batch_id: productBatchesMap.get("LMM-FFL-321") },
    { sale_id: salesData[0].id, sold_amount: 2, product_batch_id: productBatchesMap.get("LMM-FPO-225") },
    { sale_id: salesData[0].id, sold_amount: 5, product_batch_id: productBatchesMap.get("LMP-FOL-021") },
    { sale_id: salesData[1].id, sold_amount: 2, product_batch_id: productBatchesMap.get("LTM-LOO-214") },
    { sale_id: salesData[2].id, sold_amount: 2, product_batch_id: productBatchesMap.get("LMQ-LOO-214") },
    { sale_id: salesData[2].id, sold_amount: 3, product_batch_id: productBatchesMap.get("LMP-FOL-021") },
    { sale_id: salesData[2].id, sold_amount: 6, product_batch_id: productBatchesMap.get("LTM-LOP-215") },
    { sale_id: salesData[3].id, sold_amount: 13, commodity_batch_id: commodityBatchesMap.get("LMA-FEL-222") },
    { sale_id: salesData[3].id, sold_amount: 7, commodity_batch_id: commodityBatchesMap.get("LPE-FEL-051") },
    { sale_id: salesData[4].id, sold_amount: 1, product_batch_id: productBatchesMap.get("LTM-LOO-214") },
    { sale_id: salesData[5].id, sold_amount: 2, commodity_batch_id: commodityBatchesMap.get("LPE-FEL-051") },
    { sale_id: salesData[6].id, sold_amount: 1, product_batch_id: productBatchesMap.get("LMP-GPO-125") },
  ];

  return mockupSaleIngredients;
}

function getItemMapByName<T extends { name: string }>(
  itemsData: (T & { id: number })[],
  mockupItems: T[]
): Map<string, number> {
  const itemsMap = new Map<string, number>();

  for (let item of mockupItems) {
    const itemId = getItemId({ itemData: itemsData, key: "name", value: item.name });
    if (itemId) itemsMap.set(item.name!, itemId);
  }

  return itemsMap;
}

function getItemMapByExternalId<T extends { external_id: string }>(
  itemsData: (T & { id: number })[],
  mockupItems: T[]
): Map<string, number> {
  const itemsMap = new Map<string, number>();

  for (let item of mockupItems) {
    const itemId = getItemId({ itemData: itemsData, key: "external_id", value: item.external_id });
    if (itemId) itemsMap.set(item.external_id!, itemId);
  }

  return itemsMap;
}

function getDateNDaysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
