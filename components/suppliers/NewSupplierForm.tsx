"use client";

import React from "react";
import { supplierFormSchema } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";
import { createSupplier } from "@/lib/actions/supplierActions";
import SupplierForm from "./SupplierForm";

const NewSupplierForm: React.FC = () => {
  return (
    <NewRecordForm
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
