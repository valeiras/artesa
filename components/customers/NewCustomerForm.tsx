"use client";

import React from "react";
import { CustomerFormValueType, customerFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createCustomer } from "@/lib/actions/customerActions";
import CustomerForm from "./CustomerForm";

const NewCustomerForm: React.FC = () => {
  return (
    <NewItemForm<CustomerFormValueType>
      formSchema={customerFormSchema}
      defaultValues={{ name: "", email: "", phone: "", address: "" }}
      successToastMessage="Nuevo cliente creado con éxito"
      queryKeys={[["customers"], ["stats"], ["charts"]]}
      formHeader="Nuevo cliente"
      createItemFn={createCustomer}
      ItemForm={CustomerForm}
    />
  );
};

export default NewCustomerForm;
