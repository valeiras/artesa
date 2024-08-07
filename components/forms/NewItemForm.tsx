import React from "react";
import * as z from "zod";
import { FieldValues } from "react-hook-form";
import { NewRecordFormProps } from "@/lib/types/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function NewItemForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  createRecordFn,
  formHeader,
  FormLayout,
}: NewRecordFormProps<T>) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsNewItemDialogOpen } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => createRecordFn({ values })}
      formHeader={formHeader}
      FormLayout={FormLayout}
      setIsDialogOpen={setIsNewItemDialogOpen}
      submitButtonLabel="Crear"
    />
  );
}

export default NewItemForm;
