"use client";

import React from "react";
import { CommodityFormValueType, commodityFormSchema, isReadCommodityDBType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms/";
import { updateCommodity } from "@/lib/actions/commodityActions";
import { useDataTableContext } from "@/components/dataTable";
import CommodityForm from "./CommodityForm";

const UpdateCommodityForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCommodityDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm<CommodityFormValueType>
      formSchema={commodityFormSchema}
      defaultValues={{ name: itemData.name, unit: itemData.unit || undefined }}
      successToastMessage="Materia prima actualizada con éxito"
      queryKeys={[["commodity", String(itemData.id)], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Editar materia prima"
      updateItemFn={updateCommodity}
      ItemForm={CommodityForm}
    />
  );
};

export default UpdateCommodityForm;
