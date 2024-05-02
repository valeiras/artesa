import { isReadProductDBType, productFormSchema } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateProduct } from "@/lib/actions/productActions";
import ProductForm from "./ProductForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const UpdateProductForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadProductDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

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
