"use client";

import React from "react";
import { ClientFormValueType, clientFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createClient } from "@/lib/actions/clientActions";
import ClientForm from "./ClientForm";

const NewClientForm: React.FC = () => {
  return (
    <NewItemForm<ClientFormValueType>
      formSchema={clientFormSchema}
      defaultValues={{ name: "", email: "", phone: "", address: "" }}
      successToastMessage="Nuevo cliente creado con éxito"
      queryKeys={[["clients"], ["stats"], ["charts"]]}
      formHeader="Nuevo cliente"
      createRecordFn={createClient}
      RecordForm={ClientForm}
    />
  );
};

export default NewClientForm;
