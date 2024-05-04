"use client";

import React from "react";
import { ClientFormValueType, clientFormSchema, isReadClientDBType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateClient } from "@/lib/actions/clientActions";
import { useDataTableContext } from "@/components/dataTable";
import ClientFormLayout from "./ClientFormLayout";

const UpdateClientForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadClientDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const defaultValues: ClientFormValueType = {
    name: itemData.name,
    email: itemData.email || "",
    phone: itemData.phone || "",
    address: itemData.address || "",
  };

  return (
    <UpdateItemForm<ClientFormValueType>
      formSchema={clientFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Cliente actualizado con éxito"
      queryKeys={[["client", String(itemData.id)], ["clients"], ["stats"], ["charts"]]}
      formHeader="Editar cliente"
      updateRecordFn={updateClient}
      FormLayout={ClientFormLayout}
    />
  );
};

export default UpdateClientForm;
