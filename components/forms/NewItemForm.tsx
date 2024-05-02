import React from "react";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { PostgrestError } from "@supabase/supabase-js";
import { RecordFormType } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function NewItemForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  createItemFn,
  formHeader,
  ItemForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  createItemFn: (values: T) => Promise<{ dbError: PostgrestError | null }>;
  ItemForm: RecordFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsNewItemDialogOpen } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => createItemFn(values)}
      formHeader={formHeader}
      RecordForm={ItemForm}
      setIsDialogOpen={setIsNewItemDialogOpen}
    />
  );
}

export default NewItemForm;
