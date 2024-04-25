import { customerFormSchema, ReadCustomerDBType } from "@/lib/types";
import UpdateItemForm from "../forms/UpdateItemForm";

import React from "react";
import { updateCustomer } from "@/lib/actions/customerActions";
import CustomerForm from "./CustomerForm";

const UpdateCustomerForm: React.FC<{ itemData: ReadCustomerDBType }> = ({ itemData }) => {
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
