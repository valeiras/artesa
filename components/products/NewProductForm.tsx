import React from "react";
import { ProductFormValueType, productFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";

const NewProductForm: React.FC = () => {
  return (
    <NewItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={{ name: "", unit: "kg" }}
      successToastMessage="Nuevo producto creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo producto"
      createRecordFn={createProduct}
      RecordForm={ProductForm}
    />
  );
};

export default NewProductForm;
