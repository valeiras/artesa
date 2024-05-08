"use client";

import React from "react";
import {
  ProductBatchFormValueType,
  ReadProductBatchRecipeDBType,
  ReadProductWithBatchesAndIngredientsType,
  isReadProductBatchDBType,
  isReadProductWithBatchesAndIngredientsType,
  productBatchFormSchema,
} from "@/lib/types";
import { UpdateBatchForm } from "@/components/forms";
import { updateProductBatch } from "@/lib/actions/productBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductBatchFormLayout from "./ProductBatchFormLayout";
import { useQuery } from "@tanstack/react-query";
import { getSingleProductBatchRecipe } from "@/lib/actions/productBatchRecipeActions";

const UpdateProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadProductWithBatchesAndIngredientsType(itemData))
    throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadProductBatchDBType(batchData)) throw new Error("El tipo de lote no coincide con el esperado");

  const { data: productBatchRecipeData, isPending: isProductBatchRecipeDataPending } = useQuery({
    queryKey: ["commoditiesWithBatches", batchData.id],
    queryFn: () => getSingleProductBatchRecipe(batchData.id),
  });

  if (isProductBatchRecipeDataPending) return <h2>Cargando...</h2>;

  const {
    commodityIngredientAmounts,
    commodityIngredientBatchIds,
    productIngredientAmounts,
    productIngredientBatchIds,
  } = createDefaultArrays({ recipeData: productBatchRecipeData?.dbData, itemData });

  const defaultValues: ProductBatchFormValueType = {
    commodityIngredientAmounts,
    commodityIngredientBatchIds,
    productIngredientAmounts,
    productIngredientBatchIds,
    productId: String(itemData.id),
    productName: itemData.name,
    externalId: batchData.external_id || "",
    date: new Date(batchData.date),
    initialAmount: batchData.initial_amount,
    comments: batchData.comments || "",
  };

  console.log(defaultValues);
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

const createDefaultArrays = ({
  recipeData,
  itemData,
}: {
  recipeData: ReadProductBatchRecipeDBType[] | null | undefined;
  itemData: ReadProductWithBatchesAndIngredientsType;
}) => {
  const commodityIngredients = recipeData?.filter(({ commodity_ingredient_batch_id }) => commodity_ingredient_batch_id);
  const productIngredients = recipeData?.filter(({ product_ingredient_batch_id }) => product_ingredient_batch_id);

  const commodityIngredientAmounts = createDefaultArray({
    ingredients: commodityIngredients,
    outputField: "amount",
    inputField: "used_amount",
    itemDataIngredients: itemData.commodity_ingredients,
    defaultValue: 0,
  }) as { amount: number }[];

  const commodityIngredientBatchIds = createDefaultArray({
    ingredients: commodityIngredients,
    outputField: "id",
    inputField: "commodity_ingredient_batch_id",
    itemDataIngredients: itemData.commodity_ingredients,
    defaultValue: "",
  }) as { id: string }[];

  const productIngredientAmounts = createDefaultArray({
    ingredients: productIngredients,
    outputField: "amount",
    inputField: "used_amount",
    itemDataIngredients: itemData.product_ingredients,
    defaultValue: 0,
  }) as { amount: number }[];

  const productIngredientBatchIds = createDefaultArray({
    ingredients: productIngredients,
    outputField: "id",
    inputField: "product_ingredient_batch_id",
    itemDataIngredients: itemData.product_ingredients,
    defaultValue: "",
  }) as { id: string }[];

  return {
    commodityIngredientAmounts,
    commodityIngredientBatchIds,
    productIngredientAmounts,
    productIngredientBatchIds,
  };
};

const createDefaultArray = ({
  ingredients,
  outputField,
  inputField,
  itemDataIngredients,
  defaultValue,
}: {
  ingredients: ReadProductBatchRecipeDBType[] | undefined;
  outputField: "amount" | "id";
  inputField: "used_amount" | "commodity_ingredient_batch_id" | "product_ingredient_batch_id";
  itemDataIngredients: { ingredient_id: string; ingredient_name: string }[];
  defaultValue: 0 | "";
}) => {
  return ingredients
    ? ingredients?.map((it) => {
        return { [outputField]: outputField === "amount" ? it[inputField] : String(it[inputField]) };
      })
    : itemDataIngredients.map(() => {
        return { [outputField]: defaultValue };
      });
};
export default UpdateProductBatchForm;
