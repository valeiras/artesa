"use client";

import { commodityFormSchema, isReadCommodityDBType, ReadCommodityDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCommodity } from "@/lib/actions/commodityActions";
import CommodityForm from "./CommodityForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const UpdateCommodityForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm
      formSchema={commodityFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined }}
      successToastMessage="Materia prima actualizada con éxito"
      queryKeys={[["commodity", String(itemData.id)], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Editar materia prima"
      updateItemFn={updateCommodity}
      id={itemData.id}
      ItemForm={CommodityForm}
    />
  );
};

export default UpdateCommodityForm;
