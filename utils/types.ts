import * as z from "zod";

export type ItemType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  itemName: string;
  origin: string;
  producer: string;
  category: string;
  traceability: string;
  isSalable: boolean;
};

export enum ItemCategory {
  Commodity = "Materia prima",
  Derived = "Producto derivado",
}

export const createAndEditItemSchema = z.object({
  itemName: z.string().min(2, { message: "El nombre del artículo debe tener al menos 2 caracteres" }),
  origin: z.string().min(2, { message: "El nombre del lugar de origen debe tener al menos 2 caracteres" }),
  producer: z.string().min(2, { message: "El nombre del productor debe tener al menos 2 caracteres" }),
  traceability: z.string().min(2, { message: "¿La trazabilidad qué es?" }),
  category: z.nativeEnum(ItemCategory),
  isSalable: z.boolean(),
});

export type createAndEditItemType = z.infer<typeof createAndEditItemSchema>;
