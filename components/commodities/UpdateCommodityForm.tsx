import { commodityFormSchema, ReadCommodityDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCommodity } from "@/lib/actions/commodityActions";
import CommodityForm from "./CommodityForm";

const UpdateCommodityForm: React.FC<{ itemData: ReadCommodityDBType }> = ({ itemData }) => {
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
