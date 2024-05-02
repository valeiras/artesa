"use client";

import { customerFormSchema, isReadCustomerDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCustomer } from "@/lib/actions/customerActions";
import CustomerForm from "./CustomerForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const UpdateCustomerForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCustomerDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  return (
    <UpdateItemForm
      formSchema={customerFormSchema}
      defaultValues={{
        name: itemData.name,
        email: itemData.email || "",
        phone: itemData.phone || "",
        address: itemData.address || "",
      }}
      successToastMessage="Cliente actualizado con éxito"
      queryKeys={[["customer", String(itemData.id)], ["customers"], ["stats"], ["charts"]]}
      formHeader="Editar cliente"
      updateItemFn={updateCustomer}
      id={itemData.id}
      ItemForm={CustomerForm}
    />
  );
};

export default UpdateCustomerForm;
