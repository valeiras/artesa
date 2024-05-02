import { CommodityFormValueType, RecordFormType } from "@/lib/types";
import React from "react";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import { availableUnits } from "@/lib/units";

const CommodityForm: RecordFormType<CommodityFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: CommodityFormValueType) {
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
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default CommodityForm;
