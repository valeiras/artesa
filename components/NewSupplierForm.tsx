"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import { ItemCategory, createAndEditItemSchema, createAndEditItemType } from "@/utils/types";

function NewSupplierForm() {
  const form = useForm<createAndEditItemType>({
    resolver: zodResolver(createAndEditItemSchema),
    defaultValues: {
      itemName: "",
      origin: "",
      producer: "",
      traceability: "",
      category: ItemCategory.Commodity,
      isSalable: false,
    },
  });

  function onSubmit(values: createAndEditItemType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Nuevo proveedor</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end mb-8">
          <CustomFormField name="name" control={form.control} label="Nombre del productor" placeholder="Proveedor" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="origin" control={form.control} label="Origen" placeholder="Málaga" />
        </div>
        <Button type="submit" className="w-64 mx-auto">
          Crear
        </Button>
      </form>
    </Form>
  );
}
export default NewSupplierForm;
