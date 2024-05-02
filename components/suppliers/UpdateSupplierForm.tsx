"use client";

import { supplierFormSchema, isReadSupplierDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateSupplier } from "@/lib/actions/supplierActions";
import SupplierForm from "./SupplierForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const UpdateSupplierForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSupplierDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

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
