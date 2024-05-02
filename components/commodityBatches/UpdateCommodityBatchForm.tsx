"use client";

import {
  commodityBatchFormSchema,
  isReadCommodityBatchDBType,
  isReadCommodityDBType,
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
} from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCommodityBatch } from "@/lib/actions/commodityBatchActions";
import CommodityBatchForm from "./CommodityBatchForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const UpdateCommodityBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadCommodityBatchDBType(batchData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm
      formSchema={commodityBatchFormSchema}
      defaultValues={{
        commodityId: itemData.id,
        commodityName: itemData.name,
        supplierId: String(batchData.supplier_id),
        externalId: batchData.external_id,
        date: new Date(batchData.date),
        initialAmount: batchData.initial_amount,
        comments: batchData.comments || "",
      }}
      successToastMessage="Lote actualizado con éxito"
      queryKeys={[["commodity", String(itemData.id)], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Editar lote"
      updateItemFn={updateCommodityBatch}
      id={itemData.id}
      ItemForm={CommodityBatchForm}
    />
  );
};

export default UpdateCommodityBatchForm;
