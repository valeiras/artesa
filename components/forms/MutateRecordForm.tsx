import React from "react";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { useMutation, MutationFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { RecordFormType } from "@/lib/types";

function MutateRecordForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  mutationFn,
  formHeader,
  RecordForm,
  setIsDialogOpen,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  formHeader: string;
  mutationFn: MutationFunction<{ dbError: PostgrestError | null }, T>;
  RecordForm: RecordFormType<T>;
  setIsDialogOpen: (isOpen: boolean) => void;
}) {
  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: successToastMessage,
    queryKeys: queryKeys,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <RecordForm form={form} mutate={mutate} isPending={isPending} formHeader={formHeader} submitButtonLabel="Crear" />
  );
}

export default MutateRecordForm;
