"use client";

import { supplierFormSchema, ReadSupplierDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateSupplier } from "@/lib/actions/supplierActions";
import SupplierForm from "./SupplierForm";

const UpdateSupplierForm: React.FC<{ itemData: ReadSupplierDBType }> = ({ itemData }) => {
  return (
    <UpdateItemForm
      formSchema={supplierFormSchema}
      defaultValues={{
        name: itemData.name,
        email: itemData.email || "",
        phone: itemData.phone || "",
        address: itemData.address || "",
      }}
      successToastMessage="Proveedor actualizado con éxito"
      queryKeys={[["supplier", String(itemData.id)], ["suppliers"], ["stats"], ["charts"]]}
      formHeader="Editar proveedor"
      updateItemFn={updateSupplier}
      id={itemData.id}
      ItemForm={SupplierForm}
    />
  );
};

export default UpdateSupplierForm;
