import * as z from "zod";
import validator from "validator";

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

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  unit: z.enum(["box", "jar", "g", "mg", "kg", "l", "dl", "cl", "ml"]),
  ingredientIds: z.string().array(),
});

export type ProductFormType = z.infer<typeof productFormSchema>;

export const commodityFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  unit: z.enum(["box", "jar", "g", "mg", "kg", "l", "dl", "cl", "ml"]),
});

export type CommodityFormType = z.infer<typeof commodityFormSchema>;

export const commodityBatchFormSchema = z.object({
  commodityId: z.string(),
  supplierId: z.string(),
  date: z.date(),
  initialAmount: z.number(),
  comments: z.string().nullable(),
});

export type CommodityBatchFormType = z.infer<typeof commodityBatchFormSchema>;

export const supplierFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del productor debe tener al menos 2 caracteres" }),
  address: z.string().nullable(),
  phone: z.string().refine(esMobileValidator),
  email: z.string().email({ message: "Por favor, introduce un email válido" }).nullable(),
});

export type SupplierFormType = z.infer<typeof supplierFormSchema>;

export const customerFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre del cliente debe tener al menos 2 caracteres" }),
  address: z.string().nullable(),
  phone: z.string().refine(esMobileValidator),
  email: z.string().email({ message: "Por favor, introduce un email válido" }).nullable(),
});

export type CustomerFormType = z.infer<typeof customerFormSchema>;
