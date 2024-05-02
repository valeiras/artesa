"use client";

import React from "react";
import { commodityBatchFormSchema, isReadCommodityDBType } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityBatchForm from "./CommodityBatchForm";

const NewCommodityBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <NewRecordForm
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
