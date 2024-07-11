"use client";

import React from "react";
import { CommodityFormValueType, commodityFormSchema, isReadCommodityDBType } from "@/lib/types/types";
import { UpdateItemForm } from "@/components/forms/";
import { updateCommodity } from "@/lib/actions/commodityActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityFormLayout from "./CommodityFormLayout";

const UpdateCommodityForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm<CommodityFormValueType>
      formSchema={commodityFormSchema}
      defaultValues={{
        name: itemData.name || "",
        unit: itemData.unit || undefined,
        externalId: itemData.external_id || "",
      }}
      successToastMessage="Materia prima actualizada con éxito"
      queryKeys={[
        ["commodity", String(itemData.id)],
        ["commodities"],
        ["commoditiesWithBatches"],
        ["stats"],
        ["charts"],
      ]}
      formHeader="Editar materia prima"
      updateRecordFn={updateCommodity}
      FormLayout={CommodityFormLayout}
    />
  );
};

export default UpdateCommodityForm;
