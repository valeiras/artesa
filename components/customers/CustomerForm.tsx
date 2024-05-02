import { CustomerFormValueType } from "@/lib/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { CustomFormField, FormButtons } from "@/components/forms";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  form: UseFormReturn<CustomerFormValueType>;
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, CustomerFormValueType, unknown>;
  isPending: boolean;
  formHeader: string;
  submitButtonLabel: string;
};

const CustomerForm: React.FC<Props> = ({ form, mutate, isPending, formHeader, submitButtonLabel }) => {
  function onSubmit(values: CustomerFormValueType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField name="name" control={form.control} label="Nombre del cliente" placeholder="Cliente" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="cliente@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} />
      </form>
    </Form>
  );
};

export default CustomerForm;
