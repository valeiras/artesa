"use client";

import React from "react";
import {
  ProductBatchFormValueType,
  ReadProductBatchIngredientDBType,
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
import {
  createProductBatchRecipe,
  deleteProductBatchRecipeByProductBatchId,
  getProductBatchRecipeByProductBatchId,
} from "@/lib/actions/productBatchIngredientActions";

const updateRecordFn = async ({ values, recordId }: { values: ProductBatchFormValueType; recordId: number }) => {
  const { dbError: dbErrorProduct } = await updateProductBatch({ values, recordId });
  if (dbErrorProduct) return { dbError: dbErrorProduct };

  // TODO: improve this: we shouldn't blindly remove everything and create it again
  await deleteProductBatchRecipeByProductBatchId({ productBatchId: recordId });
  const { dbError: dbErrorRecipe } = await createProductBatchRecipe({ values, batchId: recordId });
  return { dbError: dbErrorRecipe };
};

const UpdateProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadProductWithBatchesAndIngredientsType(itemData))
    throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadProductBatchDBType(batchData)) throw new Error("El tipo de lote no coincide con el esperado");

  const { data: productBatchRecipeData, isPending: isProductBatchRecipeDataPending } = useQuery({
    queryKey: ["batchRecipe", String(batchData.id)],
    queryFn: () => getProductBatchRecipeByProductBatchId({ productBatchId: batchData.id }),
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

  return (
    <UpdateBatchForm<ProductBatchFormValueType>
      formSchema={productBatchFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Lote actualizado con éxito"
      queryKeys={[
        ["product", String(itemData.id)],
        ["batchRecipe", String(batchData.id)],
        ["productsWithBatchesAndIngredients"],
        ["stats"],
        ["charts"],
      ]}
      formHeader="Editar lote"
      updateRecordFn={updateRecordFn}
      FormLayout={ProductBatchFormLayout}
    />
  );
};

const createDefaultArrays = ({
  recipeData,
  itemData,
}: {
  recipeData: ReadProductBatchIngredientDBType[] | null | undefined;
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
  ingredients: ReadProductBatchIngredientDBType[] | undefined;
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
