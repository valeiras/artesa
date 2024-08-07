import { CommodityFormValueType, RecordFormType } from "@/lib/types/types";
import React from "react";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import { availableUnits } from "@/lib/db/units";

const CommodityFormLayout: RecordFormType<CommodityFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: CommodityFormValueType) {
    console.log(values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormField
            name="name"
            control={form.control}
            label="Nombre de la materia prima"
            placeholder="Manzana"
          />
          <CustomFormField
            name="externalId"
            control={form.control}
            label="Referencia (opcional)"
            placeholder="MA-2398"
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

export default CommodityFormLayout;
