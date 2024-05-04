import React from "react";
import { FieldValues } from "react-hook-form";
import { UpdateRecordFormProps } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function UpdateItemForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  updateRecordFn,
  formHeader,
  FormLayout,
}: UpdateRecordFormProps<T>) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsUpdateItemDialogOpen, itemData } = dataTableContext;

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => updateRecordFn(values, itemData.id)}
      formHeader={formHeader}
      FormLayout={FormLayout}
      setIsDialogOpen={setIsUpdateItemDialogOpen}
      submitButtonLabel="Editar"
    />
  );
}

export default UpdateItemForm;
