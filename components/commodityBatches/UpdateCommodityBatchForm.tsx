"use client";

import { commodityBatchFormSchema, ReadCommodityBatchDBType, ReadCommodityDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCommodityBatch } from "@/lib/actions/commodityBatchActions";
import CommodityBatchForm from "./CommodityBatchForm";

const UpdateCommodityBatchForm: React.FC<{
  itemData: ReadCommodityDBType;
  batchData: ReadCommodityBatchDBType;
}> = ({ itemData, batchData }) => {
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
