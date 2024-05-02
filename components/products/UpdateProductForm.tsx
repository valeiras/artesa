import React from "react";

import { ProductFormValueType, isReadProductDBType, productFormSchema } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateProduct } from "@/lib/actions/productActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductForm from "./ProductForm";

const UpdateProductForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadProductDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm<ProductFormValueType>
      formSchema={productFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined }}
      successToastMessage="Producto actualizado con éxito"
      queryKeys={[["product", String(itemData.id)], ["products"], ["stats"], ["charts"]]}
      formHeader="Editar producto"
      updateItemFn={updateProduct}
      ItemForm={ProductForm}
    />
  );
};

export default UpdateProductForm;
