import { CommodityBatchFormType } from "@/lib/types";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { CustomFormDatePicker, CustomFormField, CustomFormSelect } from "../FormComponents";
import FormButtons from "../FormButtons";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { availableUnits } from "@/lib/units";
import { getAllSuppliers } from "@/lib/actions/supplierActions";

type Props = {
  form: UseFormReturn<CommodityBatchFormType>;
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, CommodityBatchFormType, unknown>;
  isPending: boolean;
  formHeader: string;
  submitButtonLabel: string;
};

const CommodityBatchForm: React.FC<Props> = ({ form, mutate, isPending, formHeader, submitButtonLabel }) => {
  const { data: suppliersData } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  function onSubmit(values: CommodityBatchFormType) {
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
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
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
          />
          <CustomFormDatePicker name="date" control={form.control} label="Fecha" />
          <CustomFormField name="externalId" control={form.control} label="Identificador del lote" />
          <CustomFormField name="initialAmount" control={form.control} label="Cantidad" placeholder="0" type="number" />
          <CustomFormField name="comments" control={form.control} label="Comentarios" placeholder="" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} cancelButtonHref="/materias-primas" />
      </form>
    </Form>
  );
};

export default CommodityBatchForm;
