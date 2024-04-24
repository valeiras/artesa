import { ProductFormValueType } from "@/lib/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect } from "../FormComponents";
import FormButtons from "../FormButtons";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { availableUnits } from "@/lib/units";

type Props = {
  form: UseFormReturn<ProductFormValueType>;
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, ProductFormValueType, unknown>;
  isPending: boolean;
  formHeader: string;
  submitButtonLabel: string;
};

const ProductForm: React.FC<Props> = ({ form, mutate, isPending, formHeader, submitButtonLabel }) => {
  function onSubmit(values: ProductFormValueType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField
            name="name"
            control={form.control}
            label="Nombre de la materia prima"
            placeholder="Manzana"
          />
          <CustomFormSelect
            name="unit"
            items={availableUnits}
            control={form.control}
            label="Unidad de medida"
            placeholder="kg"
          />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} />
      </form>
    </Form>
  );
};

export default ProductForm;
