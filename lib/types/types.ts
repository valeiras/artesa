import * as z from "zod";
import validator from "validator";
import { Database, Enums, Tables, TablesInsert, TablesUpdate } from "./database.types";
import React from "react";
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import { UseMutateFunction, MutationFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

const esMobileValidator = (str: string) => {
  return validator.isMobilePhone(str, [
    "es-AR",
    "es-BO",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-DO",
    "es-EC",
    "es-ES",
    "es-HN",
    "es-MX",
    "es-PA",
    "es-PE",
    "es-PY",
    "es-UY",
    "es-VE",
    "et-EE",
  ]);
};

const positiveNumber = z.coerce
  .number({ invalid_type_error: "Especifica la cantidad" })
  .positive({ message: "Especifica una cantidad mayor que 0" });

export type UnitType = Enums<"unit">;
export const unitEnum = z.enum(["box", "jar", "g", "mg", "kg", "l", "dl", "cl", "ml", "unit"]);

export type PublicSchema = Database[Extract<keyof Database, "public">];
export type PublicTableName = keyof PublicSchema["Tables"];

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  unit: unitEnum,
  externalId: z.string().optional(),
  ingredientIds: z.object({ id: z.string() }).array(),
});

export type ProductFormValueType = z.infer<typeof productFormSchema>;
export type ReadProductDBType = Tables<"products">;
export type CreateProductDBType = TablesInsert<"products">;
export type UpdateProductDBType = TablesUpdate<"products">;

export const productBatchFormSchema = z.object({
  productId: z.string({ required_error: "Especifica un producto" }),
  productName: z.string({ required_error: "Especifica un producto" }),
  externalId: z
    .string({ required_error: "Asigna un identificador al lote" })
    .min(2, { message: "El identificador debe tener al menos 2 caracteres" }),
  date: z.date(),
  initialAmount: positiveNumber,
  comments: z.string().optional(),
  commodityIngredientBatchIds: z.object({ id: z.string().min(1, { message: "Selecciona un lote" }) }).array(),
  commodityIngredientAmounts: z.object({ amount: positiveNumber }).array(),
  productIngredientBatchIds: z.object({ id: z.string().min(1, { message: "Selecciona un lote" }) }).array(),
  productIngredientAmounts: z.object({ amount: positiveNumber }).array(),
});

export type ProductBatchFormValueType = z.infer<typeof productBatchFormSchema>;
export type ReadProductBatchDBType = Tables<"product_batches">;
export type CreateProductBatchDBType = TablesInsert<"product_batches">;
export type UpdateProductBatchDBType = TablesUpdate<"product_batches">;

export type ReadProductWithBatchesType = ReadProductDBType & {
  batches: ReadProductBatchDBType[];
};

export type ReadProductBatchWithAmountsType = ReadProductBatchDBType & {
  product: { name: string; unit: UnitType };
  containing_product_batches: { used_amount: number; product_batch: { date: string; external_id: string } }[];
  containing_sales: { sold_amount: number; sale: { id: number; date: string; client: { name: string } } }[];
};

export type ReadProductBatchWithAmountsAndIngredientsType = ReadProductBatchWithAmountsType & {
  contained_batches: {
    id: number;
    used_amount: number;
    product_batch: { external_id: string; product: { name: string; unit: UnitType } } | null;
    commodity_batch: { external_id: string; commodity: { name: string; unit: UnitType } } | null;
  }[];
};

export type ReadProductWithBatchesAndAmountsType = ReadProductDBType & {
  batches: ReadProductBatchWithAmountsType[];
};

export type TempReadIngredientsType = {
  product_ingredients: { products: { id: string; name: string } }[];
  commodity_ingredients: { commodities: { id: string; name: string } }[];
};

export type ReadIngredientsType = {
  product_ingredients: { id: string; name: string }[];
  commodity_ingredients: { id: string; name: string }[];
};
export type ReadProductWithBatchesAndIngredientsType = ReadProductWithBatchesType & ReadIngredientsType;
export type ReadProductWithIngredientsType = ReadProductDBType & ReadIngredientsType;

export const commodityFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  externalId: z.string().optional(),
  unit: unitEnum,
});

export type CommodityFormValueType = z.infer<typeof commodityFormSchema>;
export type ReadCommodityDBType = Tables<"commodities">;
export type CreateCommodityDBType = TablesInsert<"commodities">;
export type UpdateCommodityDBType = TablesUpdate<"commodities">;

export const commodityBatchFormSchema = z.object({
  commodityId: z.number({ required_error: "Especifica una materia prima" }),
  commodityName: z.string({ required_error: "Especifica una materia prima" }),
  supplierId: z.string().min(1, { message: "Especifica un proveedor" }),
  externalId: z
    .string({ required_error: "Asigna un identificador al lote" })
    .min(2, { message: "El identificador debe tener al menos 2 caracteres" }),
  date: z.date(),
  initialAmount: z.coerce
    .number({ invalid_type_error: "Especifica la cantidad" })
    .positive({ message: "Especifica una cantidad mayor que 0" }),
  comments: z.string().optional(),
});

export type CommodityBatchFormValueType = z.infer<typeof commodityBatchFormSchema>;
export type ReadCommodityBatchDBType = Tables<"commodity_batches">;
export type CreateCommodityBatchDBType = TablesInsert<"commodity_batches">;
export type UpdateCommodityBatchDBType = TablesUpdate<"commodity_batches">;

export type ReadCommodityWithBatchesType = ReadCommodityDBType & { batches: ReadCommodityBatchDBType[] };
export type ReadCommodityBatchWithAmountsType = ReadCommodityBatchDBType & {
  commodity: { name: string; unit: UnitType; id: number };
  supplier: { name: string; id: number };
  containing_product_batches: { used_amount: number; product_batch: { date: string; external_id: string } }[];
  containing_sales: { sold_amount: number; sale: { id: number; date: string; client: { name: string } } }[];
};
export type ReadCommodityWithBatchesAndAmountsType = ReadCommodityDBType & {
  batches: ReadCommodityBatchWithAmountsType[];
};

export const supplierFormSchema = z.object({
  name: z.string({ required_error: "Parámetro requerido" }).min(2, { message: "Introduce al menos 2 caracteres" }),
  address: z.string().optional(),
  comments: z.string().optional(),
  phone: z
    .string()
    .refine(esMobileValidator, { message: "Introduce un número de teléfono válido" })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Introduce un email válido" }).optional().or(z.literal("")),
});

export type SupplierFormValueType = z.infer<typeof supplierFormSchema>;
export type ReadSupplierDBType = Tables<"suppliers">;
export type CreateSupplierDBType = TablesInsert<"suppliers">;
export type UpdateSupplierDBType = TablesUpdate<"suppliers">;

export const clientFormSchema = z.object({
  name: z.string({ required_error: "Parámetro requerido" }).min(2, { message: "Introduce al menos 2 caracteres" }),
  address: z.string().optional(),
  comments: z.string().optional(),
  phone: z
    .string()
    .refine(esMobileValidator, { message: "Introduce un número de teléfono válido" })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Introduce un email válido" }).optional().or(z.literal("")),
});

export type ClientFormValueType = z.infer<typeof clientFormSchema>;
export type ReadClientDBType = Tables<"clients">;
export type CreateClientDBType = TablesInsert<"clients">;
export type UpdateClientDBType = TablesUpdate<"clients">;

// Article refers to either a commodity or a product
export const saleFormSchema = z.object({
  articleIds: z.object({ id: z.string() }).array(),
  batchIds: z.object({ id: z.string() }).array(),
  amounts: z.object({ amount: positiveNumber }).array(),
  clientId: z.string().min(1, { message: "Especifica un cliente" }),
  date: z.date({ required_error: "Especifica una fecha de venta" }),
  comments: z.string().optional(),
  externalId: z.string().optional(),
});

export type SaleFormValueType = z.infer<typeof saleFormSchema>;
export type ReadSaleDBType = Tables<"sales">;
export type CreateSaleDBType = TablesInsert<"sales">;
export type UpdateSaleDBType = TablesUpdate<"sales">;

export type ReadSaleIngredientDBType = Tables<"sale_ingredients">;
export type CreateSaleIngredientDBType = TablesInsert<"sale_ingredients">;
export type UpdateSaleIngredientDBType = TablesUpdate<"sale_ingredients">;

// TODO: Look for a consistent way to infer these types from the queries. From the docs:
// type CountriesWithCities = QueryData<typeof countriesWithCitiesQuery>.
// However, this requires the supabase client to be started. Script?
export type ReadSaleType = ReadSaleDBType & {
  clients: { name: string; id: string };
  date: string;
  comments: string;
  external_id: string;
  sale_ingredients: {
    sold_amount: number;
    commodity_batches: { id: string; external_id: string; commodities: { name: string; id: number } };
    product_batches: { id: string; external_id: string; products: { name: string; id: number } };
  }[];
};

export type ReadProductIngredientDBType = Tables<"product_ingredients">;
export type CreateProductIngredientDBType = TablesInsert<"product_ingredients">;
export type UpdateProductIngredientDBType = TablesUpdate<"product_ingredients">;

export type ReadProductBatchIngredientDBType = Tables<"product_batch_ingredients">;
export type CreateProductBatchIngredientDBType = TablesInsert<"product_batch_ingredients">;
export type UpdateProductBatchIngredientDBType = TablesUpdate<"product_batch_ingredients">;

export type RecordFormType<T extends FieldValues> = React.FC<{
  form: UseFormReturn<T>;
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, T, unknown>;
  isPending: boolean;
  formHeader: string;
  submitButtonLabel: string;
  setIsFormOpen: (isOpen: boolean) => void;
}>;

type BaseRecordFormProps<T extends FieldValues> = {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  FormLayout: RecordFormType<T>;
};

export type NewRecordFormProps<T extends FieldValues> = BaseRecordFormProps<T> & {
  createRecordFn: ({ values }: { values: T }) => Promise<{ dbError: PostgrestError | null }>;
};

export type UpdateRecordFormProps<T extends FieldValues> = BaseRecordFormProps<T> & {
  updateRecordFn: ({
    values,
    recordId,
  }: {
    values: T;
    recordId: number;
  }) => Promise<{ dbError: PostgrestError | null }>;
};

export type MutateRecordFormProps<T extends FieldValues> = BaseRecordFormProps<T> & {
  mutationFn: MutationFunction<{ dbError: PostgrestError | null }, T>;
  setIsDialogOpen: (isOpen: boolean) => void;
  submitButtonLabel?: string;
};

export type ReadItemDBType =
  | ReadCommodityDBType
  | ReadClientDBType
  | ReadProductDBType
  | ReadSaleDBType
  | ReadSaleType
  | ReadSupplierDBType;

export type ReadBatchDBType = ReadCommodityBatchDBType | ReadProductBatchDBType;
export type ReadRecordDBType = ReadItemDBType | ReadBatchDBType;
export type ReadRecordWithOptionsType =
  | ReadRecordDBType
  | ReadCommodityWithBatchesType
  | ReadProductWithBatchesType
  | ReadProductWithIngredientsType
  | ReadProductWithBatchesAndIngredientsType;

export type AmountEvolution = {
  date: Date;
  amount: number;
  delta: number;
  saleId?: string;
  productBatchId?: string;
  client?: string;
}[];

export type SimpleChartData = {
  date: string;
  amount: number;
}[];

export type ComplexChartData = { [dateOrBatchId: string]: number | string }[];

export function isReadCommodityDBType(record: ReadRecordWithOptionsType): record is ReadCommodityDBType {
  return "name" in record && "unit" in record;
}

export function isReadClientDBType(record: ReadRecordWithOptionsType): record is ReadClientDBType {
  return "address" in record && "email" in record && "name" in record && "phone" in record;
}

export function isReadProductDBType(record: ReadRecordWithOptionsType): record is ReadProductDBType {
  return "name" in record && "unit" in record;
}

export function isReadSaleDBType(record: ReadRecordWithOptionsType): record is ReadSaleDBType {
  return "name" in record && "unit" in record;
}

export function isReadSupplierDBType(record: ReadRecordWithOptionsType): record is ReadSupplierDBType {
  return "address" in record && "email" in record && "name" in record && "phone" in record;
}

export function isReadCommodityBatchDBType(
  record: ReadRecordWithOptionsType | undefined
): record is ReadCommodityBatchDBType {
  if (!record) return false;
  return (
    "comments" in record &&
    "commodity_id" in record &&
    "external_id" in record &&
    "initial_amount" in record &&
    "supplier_id" in record &&
    "user_id" in record
  );
}

export function isReadProductBatchDBType(
  record: ReadRecordWithOptionsType | undefined
): record is ReadProductBatchDBType {
  if (!record) return false;
  return (
    "comments" in record &&
    "product_id" in record &&
    "external_id" in record &&
    "initial_amount" in record &&
    "user_id" in record
  );
}

export function isReadProductWithBatchesType(
  record: ReadRecordWithOptionsType | undefined
): record is ReadProductWithBatchesType {
  if (!record) return false;
  return "name" in record && "unit" in record && "batches" in record;
}

export function isReadProductWithIngredientsType(
  record: ReadRecordWithOptionsType | undefined
): record is ReadProductWithIngredientsType {
  if (!record) return false;
  return "name" in record && "unit" in record && "product_ingredients" in record && "commodity_ingredients" in record;
}

export function isReadProductWithBatchesAndIngredientsType(
  record: ReadRecordWithOptionsType | undefined
): record is ReadProductWithBatchesAndIngredientsType {
  if (!record) return false;
  return (
    "name" in record &&
    "unit" in record &&
    "batches" in record &&
    "product_ingredients" in record &&
    "commodity_ingredients" in record
  );
}

export function isReadSaleType(record: ReadRecordWithOptionsType): record is ReadSaleType {
  return "client_id" in record && "clients" in record && "sale_ingredients" in record;
}

export function isPostgrestError(error: any): error is PostgrestError {
  return (
    error &&
    (error as PostgrestError).message !== undefined &&
    (error as PostgrestError).details !== undefined &&
    (error as PostgrestError).hint !== undefined &&
    (error as PostgrestError).code !== undefined
  );
}
