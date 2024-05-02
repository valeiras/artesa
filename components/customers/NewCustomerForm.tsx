"use client";

import React from "react";
import { customerFormSchema } from "@/lib/types";
import { NewRecordForm } from "@/components/forms";
import { createCustomer } from "@/lib/actions/customerActions";
import CustomerForm from "./CustomerForm";

const NewCustomerForm: React.FC = () => {
  return (
    <NewRecordForm
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
