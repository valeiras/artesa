import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { ItemFormType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { useDataTableContext } from "@/components/dataTable";
import { PostgrestError } from "@supabase/supabase-js";

function UpdateRecordForm<T extends FieldValues>({
  formSchema,
  defaultValues,
  successToastMessage,
  queryKeys,
  updateRecordFn,
  formHeader,
  id,
  ItemForm,
}: {
  formSchema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  successToastMessage: string;
  queryKeys: string[][];
  updateRecordFn: (values: T, id: number) => Promise<{ dbError: PostgrestError | null }>;
  formHeader: string;
  id: number;
  ItemForm: ItemFormType<T>;
}) {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsUpdateItemDialogOpen } = dataTableContext;

  const form = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: successToastMessage,
    queryKeys: queryKeys,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: T) => updateRecordFn(values, id),
    onSuccess: (e) => {
      setIsUpdateItemDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ItemForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader={formHeader}
      submitButtonLabel="Actualizar"
    />
  );
}

export default UpdateRecordForm;

export type UpdateRecordFormType = typeof UpdateRecordForm;
