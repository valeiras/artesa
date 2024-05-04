import { ClientFormValueType, RecordFormType } from "@/lib/types";
import React from "react";
import { Form } from "@/components/ui/form";
import { CustomFormField, FormButtons } from "@/components/forms";

const ClientFormLayout: RecordFormType<ClientFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: ClientFormValueType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="from-content">
          <CustomFormField name="name" control={form.control} label="Nombre del cliente" placeholder="Cliente" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="cliente@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ClientFormLayout;
