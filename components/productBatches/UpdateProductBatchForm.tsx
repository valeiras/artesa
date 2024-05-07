"use client";

import React from "react";
import {
  ProductBatchFormValueType,
  isReadProductBatchDBType,
  isReadProductWithBatchesAndIngredientsType,
  productBatchFormSchema,
} from "@/lib/types";
import { UpdateBatchForm } from "@/components/forms";
import { updateProductBatch } from "@/lib/actions/productBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductBatchFormLayout from "./ProductBatchFormLayout";

const UpdateProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadProductWithBatchesAndIngredientsType(itemData))
    throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadProductBatchDBType(batchData)) throw new Error("El tipo de lote no coincide con el esperado");

  const defaultValues: ProductBatchFormValueType = {
    commodityIngredientAmounts: itemData.commodity_ingredients.map(() => {
      return { amount: 0 };
    }),
    commodityIngredientBatchIds: itemData.commodity_ingredients.map(() => {
      return { id: "" };
    }),
    productIngredientAmounts: itemData.product_ingredients.map(() => {
      return { amount: 0 };
    }),
    productIngredientBatchIds: itemData.product_ingredients.map(() => {
      return { id: "" };
    }),
    productId: String(itemData.id),
    productName: itemData.name,
    externalId: batchData.external_id || "",
    date: new Date(batchData.date),
    initialAmount: batchData.initial_amount,
    comments: batchData.comments || "",
  };
  return (
    <UpdateBatchForm<ProductBatchFormValueType>
      formSchema={productBatchFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Lote actualizado con éxito"
      queryKeys={[["product", String(itemData.id)], ["productsWithBatchesAndIngredients"], ["stats"], ["charts"]]}
      formHeader="Editar lote"
      updateRecordFn={updateProductBatch}
      FormLayout={ProductBatchFormLayout}
    />
  );
};

export default UpdateProductBatchForm;
