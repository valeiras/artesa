import React from "react";
import { CreateProductDBType, ProductFormValueType, productFormSchema, unitEnum } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductFormLayout";

const NewProductForm: React.FC = () => {
  const defaultValues: ProductFormValueType = {
    name: "",
    unit: "kg",
    ingredientIds: [{ id: "" }],
  };

  const createRecordFn = (values: ProductFormValueType) => {
    createProduct(values);
  };

  return (
    <NewItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createRecordFn={createProduct}
      FormLayout={ProductForm}
    />
  );
};

export default NewProductForm;
