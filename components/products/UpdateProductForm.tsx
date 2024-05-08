import React from "react";

import { ProductFormValueType, isReadProductWithBatchesAndIngredientsType, productFormSchema } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateProduct } from "@/lib/actions/productActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductForm from "./ProductFormLayout";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";
import { createProductRecipe, deleteProductRecipe } from "@/lib/actions/productRecipeActions";

const updateRecordFn = async (values: ProductFormValueType, id: number) => {
  const { dbError: dbErrorProduct, dbData } = await updateProduct(values, id);
  if (dbErrorProduct) return { dbError: dbErrorProduct };

  // TODO: improve this: we shouldn't blindly remove everything and create it again
  await deleteProductRecipe(id);
  const { dbError: dbErrorRecipe } = await createProductRecipe({
    ingredientIds: values.ingredientIds,
    productId: id,
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
    ...itemData.commodity_ingredients.map(({ ingredient_id }) => {
      return { id: `${COMMODITY_PREFIX}${ingredient_id}` };
    }),
    ...itemData.product_ingredients.map(({ ingredient_id }) => {
      return { id: `${PRODUCT_PREFIX}${ingredient_id}` };
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
