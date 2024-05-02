"use client";

import React from "react";
import { CustomerFormValueType, customerFormSchema, isReadCustomerDBType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateCustomer } from "@/lib/actions/customerActions";
import { useDataTableContext } from "@/components/dataTable";
import CustomerForm from "./CustomerForm";

const UpdateCustomerForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadCustomerDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const defaultValues: CustomerFormValueType = {
    name: itemData.name,
    email: itemData.email || "",
    phone: itemData.phone || "",
    address: itemData.address || "",
  };

  return (
    <UpdateItemForm<CustomerFormValueType>
      formSchema={customerFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Cliente actualizado con éxito"
      queryKeys={[["customer", String(itemData.id)], ["customers"], ["stats"], ["charts"]]}
      formHeader="Editar cliente"
      updateItemFn={updateCustomer}
      ItemForm={CustomerForm}
    />
  );
};

export default UpdateCustomerForm;
