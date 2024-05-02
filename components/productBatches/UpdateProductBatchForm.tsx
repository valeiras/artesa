"use client";

import React from "react";
import { isReadProductBatchDBType, isReadProductDBType, productBatchFormSchema } from "@/lib/types";
import { UpdateRecordForm } from "@/components/forms";
import { updateProductBatch } from "@/lib/actions/productBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import ProductBatchForm from "./ProductBatchForm";

const UpdateProductBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadProductDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadProductBatchDBType(batchData)) throw new Error("El tipo de lote no coincide con el esperado");

  return (
    <UpdateRecordForm
      formSchema={productBatchFormSchema}
      defaultValues={{
        productId: String(itemData.id),
        productName: itemData.name,
        externalId: batchData.external_id || "",
        date: new Date(batchData.date),
        initialAmount: batchData.initial_amount,
        comments: batchData.comments || "",
      }}
      successToastMessage="Lote actualizado con éxito"
      queryKeys={[["product", String(itemData.id)], ["products"], ["stats"], ["charts"]]}
      formHeader="Editar lote"
      updateRecordFn={updateProductBatch}
      id={itemData.id}
      ItemForm={ProductBatchForm}
    />
  );
};

export default UpdateProductBatchForm;
