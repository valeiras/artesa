"use client";

import { commodityFormSchema } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createCommodity } from "@/lib/actions/commodityActions";
import CommodityForm from "./CommodityForm";

const NewCommodityForm: React.FC = () => {
  return (
    <NewItemForm
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
