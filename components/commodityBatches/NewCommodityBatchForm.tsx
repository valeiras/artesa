"use client";

import { ReadCommodityDBType, commodityBatchFormSchema, isReadCommodityDBType } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import CommodityBatchForm from "./CommodityBatchForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const NewCommodityBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

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
