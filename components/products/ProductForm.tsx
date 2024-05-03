import React, { useState } from "react";
import { nanoid } from "nanoid";
import { RecordFormType, ProductFormValueType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, CustomFormSelectFieldArray, FormButtons } from "@/components/forms";
import { availableUnits } from "@/lib/units";
import { useQuery } from "@tanstack/react-query";
import { getAllCommodities } from "@/lib/actions/commodityActions";
import { getAllProducts } from "@/lib/actions/productActions";
import { getAvailableArray } from "@/lib/utils";
import { Button } from "../ui/button";

const ProductForm: RecordFormType<ProductFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: ProductFormValueType) {
    mutate(values);
  }

  const { data: commoditiesData } = useQuery({
    queryKey: ["commodities"],
    queryFn: () => getAllCommodities(),
  });

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const availableCommodities = getAvailableArray(commoditiesData);
  const availableProducts = getAvailableArray(productsData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField
            name="name"
            control={form.control}
            label="Nombre del producto"
            placeholder="Manzana"
            className="justify-start"
          />
          <CustomFormSelect
            name="unit"
            items={availableUnits}
            control={form.control}
            label="Unidad de medida"
            placeholder="kg"
            className="justify-start"
          />
          <div>
            <CustomFormSelectFieldArray
              name="commodityIngredientIds"
              control={form.control}
              register={form.register}
              items={availableCommodities}
              label="Materias primas"
              placeholder="Selecciona una materia prima"
            />
          </div>
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductForm;
