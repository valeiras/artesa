"use client";

import React from "react";
import { SupplierFormValueType, supplierFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createSupplier } from "@/lib/actions/supplierActions";
import SupplierForm from "./SupplierForm";

const NewSupplierForm: React.FC = () => {
  return (
    <NewItemForm<SupplierFormValueType>
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
