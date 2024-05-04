import React from "react";
import { FieldValues } from "react-hook-form";
import { UpdateRecordFormProps } from "@/lib/types";
import { useDataTableContext } from "../dataTable";
import MutateRecordForm from "./MutateRecordForm";

function UpdateBatchForm<T extends FieldValues>({
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
  const { setIsUpdateBatchDialogOpen, batchData } = dataTableContext;
  if (!batchData) throw new Error("Faltan los datos del lote...");

  return (
    <MutateRecordForm
      formSchema={formSchema}
      defaultValues={defaultValues}
      successToastMessage={successToastMessage}
      queryKeys={queryKeys}
      mutationFn={(values: T) => updateRecordFn(values, batchData.id)}
      formHeader={formHeader}
      FormLayout={FormLayout}
      setIsDialogOpen={setIsUpdateBatchDialogOpen}
      submitButtonLabel="Editar"
    />
  );
}

export default UpdateBatchForm;
