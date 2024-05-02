import React from "react";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { PostgrestError } from "@supabase/supabase-js";
import { RecordFormType } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function NewBatchForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  createBatchFn,
  formHeader,
  BatchForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  createBatchFn: (values: T) => Promise<{ dbError: PostgrestError | null }>;
  BatchForm: RecordFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsNewBatchDialogOpen } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => createBatchFn(values)}
      formHeader={formHeader}
      RecordForm={BatchForm}
      setIsDialogOpen={setIsNewBatchDialogOpen}
    />
  );
}

export default NewBatchForm;
