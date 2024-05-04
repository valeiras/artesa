import React from "react";
import { FieldValues } from "react-hook-form";
import { NewRecordFormProps } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function NewBatchForm<T extends FieldValues>({
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
  const { setIsNewBatchDialogOpen } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => createRecordFn(values)}
      formHeader={formHeader}
      FormLayout={FormLayout}
      setIsDialogOpen={setIsNewBatchDialogOpen}
      submitButtonLabel="Crear"
    />
  );
}

export default NewBatchForm;
