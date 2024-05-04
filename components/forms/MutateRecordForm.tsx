import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { useMutation } from "@tanstack/react-query";
import { MutateRecordFormProps } from "@/lib/types";

function MutateRecordForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  mutationFn,
  formHeader,
  FormLayout,
  setIsDialogOpen,
  submitButtonLabel = "Crear",
}: MutateRecordFormProps<T>) {
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
    <FormLayout
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader={formHeader}
      submitButtonLabel={submitButtonLabel}
      setIsFormOpen={setIsDialogOpen}
    />
  );
}

export default MutateRecordForm;
