"use client";

import React from "react";
import { supplierFormSchema, isReadSupplierDBType } from "@/lib/types";
import { UpdateRecordForm } from "@/components/forms";
import { updateSupplier } from "@/lib/actions/supplierActions";
import { useDataTableContext } from "@/components/dataTable";
import SupplierForm from "./SupplierForm";

const UpdateSupplierForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSupplierDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateRecordForm
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
      updateRecordFn={updateSupplier}
      id={itemData.id}
      ItemForm={SupplierForm}
    />
  );
};

export default UpdateSupplierForm;
