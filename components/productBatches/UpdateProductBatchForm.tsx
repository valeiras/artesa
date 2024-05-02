"use client";

import { productBatchFormSchema, ReadProductBatchDBType, ReadProductDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateProductBatch } from "@/lib/actions/productBatchActions";
import ProductBatchForm from "./ProductBatchForm";

const UpdateProductBatchForm: React.FC<{
  itemData: ReadProductDBType;
  batchData: ReadProductBatchDBType;
}> = ({ itemData, batchData }) => {
  return (
    <UpdateItemForm
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
      updateItemFn={updateProductBatch}
      id={itemData.id}
      ItemForm={ProductBatchForm}
    />
  );
};

export default UpdateProductBatchForm;
