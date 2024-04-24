import { SupplierFormType } from "@/lib/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import FormButtons from "../FormButtons";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

type Props = {
  form: UseFormReturn<SupplierFormType>;
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, SupplierFormType, unknown>;
  isPending: boolean;
  formHeader: string;
  submitButtonLabel: string;
};

const SupplierForm: React.FC<Props> = ({ form, mutate, isPending, formHeader, submitButtonLabel }) => {
  function onSubmit(values: SupplierFormType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField name="name" control={form.control} label="Nombre del proveedor" placeholder="Proveedor" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} cancelButtonHref="/proveedores" />
      </form>
    </Form>
  );
};

export default SupplierForm;