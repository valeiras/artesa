import React from "react";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { PostgrestError } from "@supabase/supabase-js";
import { RecordFormType } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function UpdateBatchForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  updateBatchFn,
  formHeader,
  BatchForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  updateBatchFn: (values: T, id: number) => Promise<{ dbError: PostgrestError | null }>;
  BatchForm: RecordFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsUpdateBatchDialogOpen, batchData } = dataTableContext;
  if (!batchData) throw new Error("Faltan los datos del lote...");

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => updateBatchFn(values, batchData.id)}
      formHeader={formHeader}
      RecordForm={BatchForm}
      setIsDialogOpen={setIsUpdateBatchDialogOpen}
    />
  );
}

export default UpdateBatchForm;
