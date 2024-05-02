"use client";

import React from "react";
import { commodityFormSchema } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";
import { createCommodity } from "@/lib/actions/commodityActions";
import CommodityForm from "./CommodityForm";

const NewCommodityForm: React.FC = () => {
  return (
    <NewRecordForm
      formSchema={commodityFormSchema}
      defaultValues={{ name: "", unit: "kg" }}
      successToastMessage="Nueva materia prima creada con éxito"
      queryKeys={[["commodities"], ["stats"], ["charts"]]}
      formHeader="Nueva materia prima"
      createItemFn={createCommodity}
      ItemForm={CommodityForm}
    />
  );
};

export default NewCommodityForm;
