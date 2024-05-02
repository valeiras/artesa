"use client";

import React from "react";
import {
  CommodityBatchFormValueType,
  commodityBatchFormSchema,
  isReadCommodityBatchDBType,
  isReadCommodityDBType,
} from "@/lib/types";
import { UpdateBatchForm } from "@/components/forms";
import { updateCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityBatchForm from "./CommodityBatchForm";

const UpdateCommodityBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData, batchData } = dataTableContext;

  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");
  if (!isReadCommodityBatchDBType(batchData)) throw new Error("El tipo de lote no coincide con el esperado");

  const defaultValues: CommodityBatchFormValueType = {
    commodityId: itemData.id,
    commodityName: itemData.name,
    supplierId: String(batchData.supplier_id),
    externalId: batchData.external_id,
    date: new Date(batchData.date),
    initialAmount: batchData.initial_amount,
    comments: batchData.comments || "",
  };

  return (
    <UpdateBatchForm<CommodityBatchFormValueType>
      formSchema={commodityBatchFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Lote actualizado con éxito"
      queryKeys={[["commodity", String(itemData.id)], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Editar lote"
      updateBatchFn={updateCommodityBatch}
      BatchForm={CommodityBatchForm}
    />
  );
};

export default UpdateCommodityBatchForm;
