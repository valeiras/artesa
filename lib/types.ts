import * as z from "zod";
import validator from "validator";
import { Database } from "./database.types";

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

export const unitEnum = z.enum(["box", "jar", "g", "mg", "kg", "l", "dl", "cl", "ml"]);
export type UnitType = z.infer<typeof unitEnum>;

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  unit: unitEnum,
  ingredientIds: z.string().array(),
});

export type ProductFormType = z.infer<typeof productFormSchema>;
export type ReadProductDBType = Database["public"]["Tables"]["product"]["Row"];
export type CreateProductDBType = Database["public"]["Tables"]["product"]["Insert"];
export type UpdateProductDBType = Database["public"]["Tables"]["product"]["Update"];

export const productBatchFormSchema = z.object({
  productId: z.string({ required_error: "Especifica un producto" }),
  externalId: z.string({ required_error: "Asigna un identificador al lote" }),
  date: z.date(),
  initialAmount: z.number(),
  comments: z.string().optional(),
});

export type ProductBatchFormType = z.infer<typeof productBatchFormSchema>;
export type ReadProductBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Row"];
export type CreateProductBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Insert"];
export type UpdateProductBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Update"];

export type ReadProductWithBatches = ReadProductDBType & { batches?: ReadProductBatchDBType[] };

export const commodityFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  unit: unitEnum,
});

export type CommodityFormType = z.infer<typeof commodityFormSchema>;
export type ReadCommodityDBType = Database["public"]["Tables"]["commodity"]["Row"];
export type CreateCommodityDBType = Database["public"]["Tables"]["commodity"]["Insert"];
export type UpdateCommodityDBType = Database["public"]["Tables"]["commodity"]["Update"];

export const commodityBatchFormSchema = z.object({
  commodityId: z.number({ required_error: "Especifica una materia prima" }),
  commodityName: z.string({ required_error: "Especifica una materia prima" }),
  supplierId: z.string().min(1, { message: "Especifica un productor" }),
  externalId: z
    .string({ required_error: "Asigna un identificador al lote" })
    .min(2, { message: "El identificador debe tener al menos 2 caracteres" }),
  date: z.date(),
  initialAmount: z.coerce
    .number({ invalid_type_error: "Especifica la cantidad" })
    .positive({ message: "Especifica una cantidad positiva" }),
  comments: z.string().optional(),
});

export type CommodityBatchFormType = z.infer<typeof commodityBatchFormSchema>;
export type ReadCommodityBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Row"];
export type CreateCommodityBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Insert"];
export type UpdateCommodityBatchDBType = Database["public"]["Tables"]["commodity_batch"]["Update"];

export type ReadCommodityWithBatches = ReadCommodityDBType & { batches?: ReadCommodityBatchDBType[] };

export const supplierFormSchema = z.object({
  name: z.string({ required_error: "Parámetro requerido" }).min(2, { message: "Introduce al menos 2 caracteres" }),
  address: z.string().optional(),
  phone: z
    .string()
    .refine(esMobileValidator, { message: "Introduce un número de teléfono válido" })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Introduce un email válido" }).optional().or(z.literal("")),
});

export type SupplierFormType = z.infer<typeof supplierFormSchema>;
export type ReadSupplierDBType = Database["public"]["Tables"]["supplier"]["Row"];
export type CreateSupplierDBType = Database["public"]["Tables"]["supplier"]["Insert"];
export type UpdateSupplierDBType = Database["public"]["Tables"]["supplier"]["Update"];

export const customerFormSchema = z.object({
  name: z.string({ required_error: "Parámetro requerido" }).min(2, { message: "Introduce al menos 2 caracteres" }),
  address: z.string().optional(),
  phone: z
    .string()
    .refine(esMobileValidator, { message: "Introduce un número de teléfono válido" })
    .optional()
    .or(z.literal("")),
  email: z.string().email({ message: "Introduce un email válido" }).optional().or(z.literal("")),
});

export type CustomerFormType = z.infer<typeof customerFormSchema>;
export type ReadCustomerDBType = Database["public"]["Tables"]["customer"]["Row"];
export type CreateCustomerDBType = Database["public"]["Tables"]["customer"]["Insert"];
export type UpdateCustomerDBType = Database["public"]["Tables"]["customer"]["Update"];

export const saleFormSchema = z.object({
  productId: z.string({ required_error: "Especifica un producto" }),
  clientId: z.string({ required_error: "Especifica un cliente" }),
  amount: z.number({ required_error: "Especifica una cantidad" }),
  date: z.date({ required_error: "Especifica una fecha de venta" }),
});

export type SaleFormType = z.infer<typeof saleFormSchema>;
export type ReadSaleDBType = Database["public"]["Tables"]["sale"]["Row"];
export type CreateSaleDBType = Database["public"]["Tables"]["sale"]["Insert"];
export type UpdateSaleDBType = Database["public"]["Tables"]["sale"]["Update"];
