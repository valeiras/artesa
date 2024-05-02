import React from "react";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { PostgrestError } from "@supabase/supabase-js";
import { RecordFormType } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function UpdateItemForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  updateItemFn,
  formHeader,
  ItemForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  updateItemFn: (values: T, id: number) => Promise<{ dbError: PostgrestError | null }>;
  ItemForm: RecordFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsUpdateItemDialogOpen, itemData } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => updateItemFn(values, itemData.id)}
      formHeader={formHeader}
      RecordForm={ItemForm}
      setIsDialogOpen={setIsUpdateItemDialogOpen}
    />
  );
}

export default UpdateItemForm;
