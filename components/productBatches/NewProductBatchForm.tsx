"use client";

import {
  ProductBatchFormValueType,
  isReadProductDBType,
  isReadProductWithIngredientsType,
  productBatchFormSchema,
} from "@/lib/types";
import { NewBatchForm } from "@/components/forms";

import React from "react";
import { createProductBatch } from "@/lib/actions/productBatchActions";
import { useDataTableContext } from "@/components/dataTable/";
import ProductBatchFormLayout from "./ProductBatchFormLayout";

const NewProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;

  if (!isReadProductWithIngredientsType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

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
    externalId: "",
    date: new Date(),
    initialAmount: 0,
    comments: "",
  };

  return (
    <NewBatchForm<ProductBatchFormValueType>
      formSchema={productBatchFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo lote creado con éxito"
      queryKeys={[["productsWithBatchesAndIngredients"], ["stats"], ["charts"]]}
      formHeader="Nuevo lote"
      createRecordFn={createProductBatch}
      FormLayout={ProductBatchFormLayout}
    />
  );
};

export default NewProductBatchForm;
