"use client";

import React from "react";
import { supplierFormSchema, isReadSupplierDBType, SupplierFormValueType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateSupplier } from "@/lib/actions/supplierActions";
import { useDataTableContext } from "@/components/dataTable";
import SupplierFormLayout from "./SupplierFormLayout";

const UpdateSupplierForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSupplierDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const defaultValues: SupplierFormValueType = {
    name: itemData.name,
    email: itemData.email || "",
    phone: itemData.phone || "",
    address: itemData.address || "",
  };
  return (
    <UpdateItemForm<SupplierFormValueType>
      formSchema={supplierFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Proveedor actualizado con éxito"
      queryKeys={[["supplier", String(itemData.id)], ["suppliers"], ["stats"], ["charts"]]}
      formHeader="Editar proveedor"
      updateRecordFn={updateSupplier}
      FormLayout={SupplierFormLayout}
    />
  );
};

export default UpdateSupplierForm;
