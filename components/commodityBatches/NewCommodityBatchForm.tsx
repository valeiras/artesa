"use client";

import { ReadCommodityDBType, commodityBatchFormSchema } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import CommodityBatchForm from "./CommodityBatchForm";

const NewCommodityBatchForm: React.FC<{ itemData: ReadCommodityDBType }> = ({ itemData }) => {
  return (
    <NewItemForm
      formSchema={commodityBatchFormSchema}
      defaultValues={{
        commodityId: itemData.id,
        commodityName: itemData.name,
        supplierId: "",
        externalId: "",
        date: new Date(),
        initialAmount: 0,
        comments: "",
      }}
      successToastMessage="Nuevo lote creado con éxito"
      queryKeys={[["commodities"], ["stats"], ["charts"]]}
      formHeader="Nuevo lote"
      createItemFn={createCommodityBatch}
      ItemForm={CommodityBatchForm}
    />
  );
};

export default NewCommodityBatchForm;
