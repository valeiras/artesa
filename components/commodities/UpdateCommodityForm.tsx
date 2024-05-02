"use client";

import React from "react";
import { commodityFormSchema, isReadCommodityDBType } from "@/lib/types";
import { UpdateRecordForm } from "@/components/forms/";
import { updateCommodity } from "@/lib/actions/commodityActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityForm from "./CommodityForm";

const UpdateCommodityForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateRecordForm
      formSchema={commodityFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined }}
      successToastMessage="Materia prima actualizada con éxito"
      queryKeys={[["commodity", String(itemData.id)], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Editar materia prima"
      updateRecordFn={updateCommodity}
      id={itemData.id}
      ItemForm={CommodityForm}
    />
  );
};

export default UpdateCommodityForm;
