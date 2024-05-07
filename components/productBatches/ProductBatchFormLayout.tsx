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

  const commodityIds = itemData.commodity_ingredients.map(({ ingredient_id }) => parseInt(ingredient_id));
  const productIds = itemData.product_ingredients.map(({ ingredient_id }) => parseInt(ingredient_id));

  const { data: commodityBatchesData, isPending: isCommodityBatchesDataPending } = useQuery({
    queryKey: ["commodityBatches", itemData.id],
    queryFn: () => getCommodityBatches(commodityIds),
  });

  const { data: productBatchesData, isPending: isProductBatchesDataPending } = useQuery({
    queryKey: ["productBatches", itemData.id],
    queryFn: () => getProductBatches(productIds),
  });

  const commodityIngredientsWithBatches = itemData.commodity_ingredients.map((it) => {
    const batches = commodityBatchesData?.dbData
      ?.filter(({ commodity_id }) => commodity_id === parseInt(it.ingredient_id))
      .map(({ id, external_id }) => {
        return { id, external_id };
      });
    return { ...it, batches };
  });

  const productIngredientsWithBatches = itemData.product_ingredients.map((it) => {
    const batches = productBatchesData?.dbData
      ?.filter(({ product_id }) => product_id === parseInt(it.ingredient_id))
      .map(({ id, external_id }) => {
        return { id, external_id };
      });
    return { ...it, batches };
  });

  const commodityItems = commodityIngredientsWithBatches.map(({ batches }) => {
    return (
      batches?.map(({ external_id, id }) => {
        return { value: String(id), label: external_id };
      }) || []
    );
  });

  const productItems = productIngredientsWithBatches.map(({ batches }) => {
    return (
      batches?.map(({ external_id, id }) => {
        return { value: String(id), label: external_id };
      }) || []
    );
  });

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
            <div className="flex flex-col space-y-2 h-full justify-between">
              {commodityIngredientsWithBatches.map(({ ingredient_name, ingredient_id }) => {
                return (
                  <div className="fake-input -mt-1" key={`${COMMODITY_PREFIX}${ingredient_id}`}>
                    {ingredient_name}:
                  </div>
                );
              })}
            </div>
            <CustomFormSelectFieldArray
              name="commodityIngredientBatchIds"
              control={form.control}
              register={form.register}
              independentItems={commodityItems}
              placeholder="Selecciona un lote"
              hasVariableAmount={false}
            />
            <CustomFormFieldArray
              name="commodityIngredientAmounts"
              control={form.control}
              register={form.register}
              placeholder="Cantidad empleada"
              hasVariableAmount={false}
              type="number"
            />
            <div className="flex flex-col">
              {productIngredientsWithBatches.map(({ ingredient_name, ingredient_id }) => {
                return (
                  <div className="fake-input" key={`${PRODUCT_PREFIX}${ingredient_id}`}>
                    {ingredient_name}:
                  </div>
                );
              })}
            </div>
            <CustomFormSelectFieldArray
              name="productIngredientBatchIds"
              control={form.control}
              register={form.register}
              independentItems={productItems}
              placeholder="Selecciona un lote"
              hasVariableAmount={false}
            />
            <CustomFormFieldArray
              name="productIngredientAmounts"
              control={form.control}
              register={form.register}
              placeholder="Cantidad empleada"
              hasVariableAmount={false}
              type="number"
            />
          </div>
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductBatchFormLayout;
