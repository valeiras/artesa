"use client";

import React from "react";
import { CommodityBatchFormValueType, commodityBatchFormSchema, isReadCommodityDBType } from "@/lib/types";
import { NewBatchForm } from "@/components/forms";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityBatchFormLayout from "./CommodityBatchFormLayout";

const NewCommodityBatchForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const defaultValues: CommodityBatchFormValueType = {
    commodityId: itemData.id,
    commodityName: itemData.name,
    supplierId: "",
    externalId: "",
    date: new Date(),
    initialAmount: 0,
    comments: "",
  };

  return (
    <NewBatchForm<CommodityBatchFormValueType>
      formSchema={commodityBatchFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Nuevo lote creado con éxito"
      queryKeys={[["commoditiesWithBatches"], ["stats"], ["charts"]]}
      formHeader="Nuevo lote"
      createRecordFn={createCommodityBatch}
      FormLayout={CommodityBatchFormLayout}
    />
  );
};

export default NewCommodityBatchForm;
