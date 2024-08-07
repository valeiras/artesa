import React from "react";
import { RecordFormType, ProductFormValueType } from "@/lib/types/types";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, CustomFormSelectFieldArray, FormButtons } from "@/components/forms";
import { availableUnits } from "@/lib/db/units";
import useAvailableArticles from "@/lib/hooks/useAvailableArticles";

const ProductForm: RecordFormType<ProductFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: ProductFormValueType) {
    mutate(values);
  }

  const { availableArticles } = useAvailableArticles();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormField
            name="name"
            control={form.control}
            label="Nombre del producto"
            placeholder="Mermelada de fresa"
            className="justify-start"
          />
          <CustomFormSelect
            name="unit"
            items={availableUnits}
            control={form.control}
            label="Unidad de medida"
            placeholder="kg"
            className="justify-start"
          />
          <CustomFormField
            name="externalId"
            control={form.control}
            label="Referencia (opcional)"
            placeholder="MA-2398"
          />
          <CustomFormSelectFieldArray
            name="ingredientIds"
            form={form}
            commonItems={availableArticles}
            placeholder="Selecciona un ingrediente"
            emptyPlaceholder="No hay ingredientes disponibles"
            label="Ingredientes"
            emptyValue={{ id: "" }}
            objectField="id"
            gap="2"
          />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductForm;
