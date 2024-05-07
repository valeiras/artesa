import {
  ProductBatchFormValueType,
  ReadProductWithIngredientsType,
  RecordFormType,
  isReadProductWithIngredientsType,
} from "@/lib/types";
import React from "react";
import { Form } from "@/components/ui/form";
import { CustomFormDatePicker, CustomFormField, CustomFormSelectFieldArray, FormButtons } from "@/components/forms";
import { useDataTableContext } from "../dataTable";
import { useQuery } from "@tanstack/react-query";
import { getCommodityBatches } from "@/lib/actions/commodityBatchActions";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";
import { getProductBatches } from "@/lib/actions/productBatchActions";
import CustomFormFieldArray from "../forms/CustomFormFieldArray";
import IngredientsSection from "./IngredientsSection";

const ProductBatchFormLayout: RecordFormType<ProductBatchFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadProductWithIngredientsType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  function onSubmit(values: ProductBatchFormValueType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormField
            name="productName"
            control={form.control}
            label="Producto final"
            placeholder="Mermelada de fresa"
            disabled={true}
          />
          <CustomFormDatePicker name="date" control={form.control} label="Fecha" />
          <CustomFormField name="externalId" control={form.control} label="Identificador del lote" />
          <CustomFormField name="initialAmount" control={form.control} label="Cantidad" placeholder="0" type="number" />
          <CustomFormField name="comments" control={form.control} label="Comentarios" placeholder="" />
          <span className="md:col-span-2 lg:col-span-3 text-center text-lg font-medium">Ingredientes</span>
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-3 gap-4">
            <IngredientsSection
              ingredientType="commodity"
              ingredients={itemData.commodity_ingredients}
              itemId={itemData.id}
              getBatches={getCommodityBatches}
              idVar="commodity_id"
              prefix={COMMODITY_PREFIX}
              form={form}
            />
            <IngredientsSection
              ingredientType="product"
              ingredients={itemData.product_ingredients}
              itemId={itemData.id}
              getBatches={getProductBatches}
              idVar="product_id"
              prefix={PRODUCT_PREFIX}
              form={form}
            />
          </div>
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductBatchFormLayout;
