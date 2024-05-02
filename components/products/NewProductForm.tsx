import React from "react";
import { productFormSchema } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";

const NewProductForm: React.FC = () => {
  return (
    <NewRecordForm
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
