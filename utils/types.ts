import * as z from "zod";

export type SupplierType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  name: string;
  email: string | null;
  origin: string;
  articles?: ArticleType[];
};

export type ArticleType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  name: string;
  origin: string;
  supplierId: number;
  category: string;
  traceability: string;
  isSalable: boolean;
  componentsIds?: number[];
  containedInIds?: number[];
};

export enum Category {
  Commodity = "Materia prima",
  Derived = "Producto derivado",
}

export const createAndEditArticleSchema = z.object({
  name: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  origin: z.string().min(2, { message: "El nombre del lugar de origen debe tener al menos 2 caracteres" }),
  supplierId: z.number(),
  traceability: z.string().min(2, { message: "¿La trazabilidad qué es?" }),
  category: z.nativeEnum(Category),
  isSalable: z.boolean(),
  composedById: z.array(z.number()).optional(),
  containedInId: z.array(z.number()).optional(),
});

export type CreateAndEditArticleType = z.infer<typeof createAndEditArticleSchema>;

export const createAndEditSupplierSchema = z.object({
  name: z.string().min(2, { message: "El nombre del productor debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "El nombre del productor debe tener al menos 2 caracteres" }).nullable(),
  origin: z.string().min(2, { message: "El nombre del lugar de origen debe tener al menos 2 caracteres" }),
});

export type CreateAndEditSupplierType = z.infer<typeof createAndEditSupplierSchema>;
