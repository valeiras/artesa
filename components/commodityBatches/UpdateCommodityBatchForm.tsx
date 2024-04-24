"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  commodityBatchFormSchema,
  CommodityBatchFormValueType,
  ReadCommodityBatchDBType,
  ReadCommodityDBType,
  ReadCommodityWithBatchesType,
} from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { updateCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityBatchForm from "./CommodityBatchForm";

type Props = { batchData: ReadCommodityBatchDBType; itemData: ReadCommodityWithBatchesType };
const UpdateCommodityBatchForm: React.FC<Props> = ({ batchData, itemData }) => {
  const form = useForm<CommodityBatchFormValueType>({
    resolver: zodResolver(commodityBatchFormSchema),
    defaultValues: {
      commodityId: itemData.id,
      commodityName: itemData.name,
      supplierId: String(batchData.supplier_id),
      externalId: batchData.external_id,
      date: new Date(batchData.date),
      initialAmount: batchData.initial_amount,
      comments: batchData.comments || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Lote actualizado con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityBatchFormValueType) => updateCommodityBatch(values, batchData.id),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <CommodityBatchForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar lote"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateCommodityBatchForm;

export type UpdateCommodityBatchFormType = typeof UpdateCommodityBatchForm;
