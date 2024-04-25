import { productFormSchema, ReadProductDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";

const UpdateProductForm: React.FC<{ itemData: ReadProductDBType }> = ({ itemData }) => {
  return (
    <UpdateItemForm
      formSchema={productFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined }}
      successToastMessage="Producto actualizado con éxito"
      queryKeys={[["product", String(itemData.id)], ["products"], ["stats"], ["charts"]]}
      formHeader="Editar producto"
      updateItemFn={updateProduct}
      id={itemData.id}
      ItemForm={ProductForm}
    />
  );
};

export default UpdateProductForm;
