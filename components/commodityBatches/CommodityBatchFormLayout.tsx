import React from "react";
import { CommodityBatchFormValueType, RecordFormType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { CustomFormDatePicker, CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import { getAllSuppliers } from "@/lib/actions/supplierActions";
import { getAvailableArray } from "@/lib/utils";

const CommodityBatchFormLayout: RecordFormType<CommodityBatchFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  const { data: suppliersData, isPending: isDataPending } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  function onSubmit(values: CommodityBatchFormValueType) {
    mutate(values);
  }

  const availableSuppliers = getAvailableArray(suppliersData?.dbData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormField
            name="commodityName"
            control={form.control}
            label="Materia prima"
            placeholder="Manzana"
            disabled={true}
          />
          <CustomFormSelect
            name="supplierId"
            items={availableSuppliers}
            control={form.control}
            label="Proveedor"
            placeholder="Selecciona un proveedor"
            emptyPlaceholder="No hay proveedores disponibles"
            isPending={isDataPending}
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

export default CommodityBatchFormLayout;
