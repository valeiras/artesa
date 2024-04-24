"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  productBatchFormSchema,
  ProductBatchFormValueType,
  ReadProductBatchDBType,
  ReadProductDBType,
} from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { updateProductBatch } from "@/lib/actions/productBatchActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import ProductBatchForm from "./ProductBatchForm";

type Props = { batchData: ReadProductBatchDBType; itemData: ReadProductDBType };
const UpdateProductBatchForm: React.FC<Props> = ({ batchData, itemData }) => {
  const form = useForm<ProductBatchFormValueType>({
    resolver: zodResolver(productBatchFormSchema),
    defaultValues: {
      productId: String(itemData.id),
      productName: itemData.name,
      externalId: batchData.external_id || "",
      date: new Date(batchData.date),
      initialAmount: batchData.initial_amount,
      comments: batchData.comments || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Lote actualizado con éxito",
    queryKeys: [["products"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProductBatchFormValueType) => updateProductBatch(values, batchData.id),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ProductBatchForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar lote"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateProductBatchForm;

export type UpdateProductBatchFormType = typeof UpdateProductBatchForm;
