import React from "react";
import { ProductFormValueType, productFormSchema } from "@/lib/types/types";
import { NewItemForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductFormLayout";
import { createProductRecipe } from "@/lib/actions/productIngredientActions";

const NewProductForm: React.FC = () => {
  const defaultValues: ProductFormValueType = {
    name: "",
    unit: "kg",
    externalId: "",
    ingredientIds: [],
  };

  const createRecordFn = async ({ values }: { values: ProductFormValueType }) => {
    const { dbError: dbErrorProduct, dbData } = await createProduct({ values });
    if (dbErrorProduct || !dbData) return { dbError: dbErrorProduct };

    const { dbError: dbErrorRecipe } = await createProductRecipe({
      ingredientIds: values.ingredientIds.filter(({ id }) => id !== null && id !== ""),
      productId: dbData.id,
    });
    return { dbError: dbErrorRecipe };
  };

  return (
    <NewItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["productsWithBatchesAndIngredients"], ["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createRecordFn={createRecordFn}
      FormLayout={ProductForm}
    />
  );
};

export default NewProductForm;
