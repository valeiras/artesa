import React from "react";
import { ProductFormValueType, productFormSchema, unitEnum } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";

const NewProductForm: React.FC = () => {
  const defaultValues: ProductFormValueType = {
    name: "",
    unit: "kg",
    commodityIngredientIds: [{ id: "" }],
    productIngredientIds: [{ id: "" }],
  };

  return (
    <NewItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createRecordFn={createProduct}
      RecordForm={ProductForm}
    />
  );
};

export default NewProductForm;
