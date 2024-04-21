"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormCheckbox, CustomFormField, CustomFormSelect } from "./FormComponents";
import { Category, createAndEditArticleSchema, CreateAndEditArticleType } from "@/lib/types";

function NewProductForm() {
  const form = useForm<CreateAndEditArticleType>({
    resolver: zodResolver(createAndEditArticleSchema),
    defaultValues: {
      name: "",
      origin: "",
      supplierId: 0,
      traceability: "",
      category: Category.Commodity,
      isSalable: false,
    },
  });

  function onSubmit(values: CreateAndEditArticleType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Nuevo artículo</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end mb-8">
          <CustomFormField
            name="name"
            control={form.control}
            label="Nombre del producto o materia prima"
            placeholder="tomate"
          />
          <CustomFormField name="origin" control={form.control} label="Origen" placeholder="Málaga" />
          <CustomFormField
            name="traceability"
            control={form.control}
            label="Trazabilidad"
            placeholder="¿Esto qué es?"
          />
          <CustomFormSelect
            name="category"
            control={form.control}
            label="Tipo de elemento"
            items={Object.values(Category)}
            placeholder="Producto derivado o materia prima"
          />
          <CustomFormCheckbox name="isSalable" control={form.control} label="A la venta" />
        </div>
        <Button type="submit" className="w-64 mx-auto">
          Crear
        </Button>
      </form>
    </Form>
  );
}
export default NewProductForm;
