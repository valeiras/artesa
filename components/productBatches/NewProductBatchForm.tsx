"use client";

import { isReadProductDBType, productBatchFormSchema } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";

import React from "react";
import { createProductBatch } from "@/lib/actions/productBatchActions";
import { useDataTableContext } from "@/components/dataTable/";
import ProductBatchForm from "./ProductBatchForm";

const NewProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadProductDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <NewRecordForm
      formSchema={productBatchFormSchema}
      defaultValues={{
        productId: String(itemData.id),
        productName: itemData.name,
        externalId: "",
        date: new Date(),
        initialAmount: 0,
        comments: "",
      }}
      successToastMessage="Nuevo lote creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo lote"
      createItemFn={createProductBatch}
      ItemForm={ProductBatchForm}
    />
  );
};

export default NewProductBatchForm;
