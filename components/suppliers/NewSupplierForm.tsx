"use client";

import { supplierFormSchema } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createSupplier } from "@/lib/actions/supplierActions";
import SupplierForm from "./SupplierForm";

const NewSupplierForm: React.FC = () => {
  return (
    <NewItemForm
      formSchema={supplierFormSchema}
      defaultValues={{ name: "", email: "", phone: "", address: "" }}
      successToastMessage="Nuevo proveedor creado con éxito"
      queryKeys={[["suppliers"], ["stats"], ["charts"]]}
      formHeader="Nuevo proveedor"
      createItemFn={createSupplier}
      ItemForm={SupplierForm}
    />
  );
};

export default NewSupplierForm;
