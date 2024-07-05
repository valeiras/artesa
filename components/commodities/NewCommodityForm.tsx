"use client";

import React from "react";
import { CommodityFormValueType, commodityFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createCommodity } from "@/lib/actions/commodityActions";
import CommodityFormLayout from "./CommodityFormLayout";

const NewCommodityForm: React.FC = () => {
  return (
    <NewItemForm<CommodityFormValueType>
      formSchema={commodityFormSchema}
      defaultValues={{ name: "", unit: "kg", externalId: "" }}
      successToastMessage="Nueva materia prima creada con éxito"
      queryKeys={[["commoditiesWithBatches"], ["commodities"], ["stats"], ["charts"]]}
      formHeader="Nueva materia prima"
      createRecordFn={createCommodity}
      FormLayout={CommodityFormLayout}
    />
  );
};

export default NewCommodityForm;
