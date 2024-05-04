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
        <div className="form-content">
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

          <CustomFormSelectFieldArray
            name="ingredientIds"
            control={form.control}
            register={form.register}
            errors={form.formState.errors}
            items={[...availableCommodities, ...availableProducts]}
            placeholder="Selecciona un ingrediente"
          />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductForm;
