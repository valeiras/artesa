import { ItemFormType, ProductFormValueType, productFormSchema } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";

const NewProductForm: React.FC = () => {
  return (
    <NewItemForm
      formSchema={productFormSchema}
      defaultValues={{ name: "", unit: "kg" }}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createItemFn={createProduct}
      ItemForm={ProductForm}
    />
  );
};

export default NewProductForm;
