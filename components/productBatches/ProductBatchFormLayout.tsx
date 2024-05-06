import { ProductBatchFormValueType, RecordFormType } from "@/lib/types";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { CustomFormDatePicker, CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import { getAllSuppliers } from "@/lib/actions/supplierActions";

const ProductBatchFormLayout: RecordFormType<ProductBatchFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  const { data: suppliersData } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  function onSubmit(values: ProductBatchFormValueType) {
    mutate(values);
  }

  const availableSuppliers =
    suppliersData?.dbData.map(({ name, id }) => {
      return { value: id.toString(), label: name };
    }) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormField
            name="productName"
            control={form.control}
            label="Producto final"
            placeholder="Mermelada de fresa"
            disabled={true}
          />
          <CustomFormSelect
            name="supplierId"
            items={availableSuppliers}
            control={form.control}
            label="Proveedor"
            placeholder="Selecciona un proveedor"
          />
          <CustomFormDatePicker name="date" control={form.control} label="Fecha" />
          <CustomFormField name="externalId" control={form.control} label="Identificador del lote" />
          <CustomFormField name="initialAmount" control={form.control} label="Cantidad" placeholder="0" type="number" />
          <CustomFormField name="comments" control={form.control} label="Comentarios" placeholder="" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default ProductBatchFormLayout;
