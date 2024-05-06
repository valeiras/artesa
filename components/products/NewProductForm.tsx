import React from "react";
import { ProductFormValueType, productFormSchema, unitEnum } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductFormLayout";
import { createProductRecipe } from "@/lib/actions/productRecipeActions";

const NewProductForm: React.FC = () => {
  const defaultValues: ProductFormValueType = {
    name: "",
    unit: "kg",
    ingredientIds: [{ id: "" }],
  };

  const createRecordFn = async (values: ProductFormValueType) => {
    const { dbError: dbErrorProduct, dbData } = await createProduct(values);
    if (dbErrorProduct || !dbData) {
      console.log("Fuck!!");
      return { dbError: dbErrorProduct };
    }

    const { dbError: dbErrorRecipe } = await createProductRecipe({
      ingredientIds: values.ingredientIds,
      productId: dbData.id,
    });
    return { dbError: dbErrorRecipe };
  };

  return (
    <NewItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["productsWithBatchesAndIngredients"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createRecordFn={createRecordFn}
      FormLayout={ProductForm}
    />
  );
};

export default NewProductForm;
