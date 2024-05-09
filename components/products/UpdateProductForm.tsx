import React from "react";

import { ProductFormValueType, isReadProductWithBatchesAndIngredientsType, productFormSchema } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateProduct } from "@/lib/actions/productActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductForm from "./ProductFormLayout";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";
import { createProductRecipe, deleteProductRecipeByProductId } from "@/lib/actions/productIngredientActions";

const updateRecordFn = async ({ values, recordId }: { values: ProductFormValueType; recordId: number }) => {
  const { dbError: dbErrorProduct } = await updateProduct({ values, recordId });
  if (dbErrorProduct) return { dbError: dbErrorProduct };

  // TODO: improve this: we shouldn't blindly remove everything and create it again
  await deleteProductRecipeByProductId({ productId: recordId });
  const { dbError: dbErrorRecipe } = await createProductRecipe({
    ingredientIds: values.ingredientIds,
    productId: recordId,
  });
  return { dbError: dbErrorRecipe };
};

const UpdateProductForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");

  const { itemData } = dataTableContext;
  if (!isReadProductWithBatchesAndIngredientsType(itemData))
    throw new Error("El tipo de artículo no coincide con el esperado");

  const ingredientIds = [
    ...itemData.commodity_ingredients.map(({ id }) => {
      return { id: `${COMMODITY_PREFIX}${id}` };
    }),
    ...itemData.product_ingredients.map(({ id }) => {
      return { id: `${PRODUCT_PREFIX}${id}` };
    }),
  ];

  return (
    <UpdateItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined, ingredientIds }}
      successToastMessage="Producto actualizado con éxito"
      queryKeys={[["product", String(itemData.id)], ["productsWithBatchesAndIngredients"], ["stats"], ["charts"]]}
      formHeader="Editar producto"
      updateRecordFn={updateRecordFn}
      FormLayout={ProductForm}
    />
  );
};

export default UpdateProductForm;
