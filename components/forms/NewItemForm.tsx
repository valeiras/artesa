import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { useMutation } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { ItemFormType } from "@/lib/types";

function NewItemForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  formHeader,
  createItemFn,
  ItemForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  createItemFn: (values: T) => Promise<{ dbError: PostgrestError | null }>;
  ItemForm: ItemFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: successToastMessage,
    queryKeys: queryKeys,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: T) => createItemFn(values),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ItemForm form={form} mutate={mutate} isPending={isPending} formHeader={formHeader} submitButtonLabel="Crear" />
  );
}

export default NewItemForm;

export type NewItemFormType = typeof NewItemForm;