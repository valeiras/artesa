"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commodityBatchFormSchema, CommodityBatchFormValueType, ReadCommodityWithBatchesType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityBatchForm from "./CommodityBatchForm";

type Props = { itemData: ReadCommodityWithBatchesType };
const NewCommodityBatchForm: React.FC<Props> = ({ itemData }) => {
  const form = useForm<CommodityBatchFormValueType>({
    resolver: zodResolver(commodityBatchFormSchema),
    defaultValues: {
      commodityId: itemData.id,
      commodityName: itemData.name,
      supplierId: "",
      externalId: "",
      date: new Date(),
      initialAmount: 0,
      comments: "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Lote creado con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityBatchFormValueType) => createCommodityBatch(values),
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
      formHeader="Nuevo lote"
      submitButtonLabel="Crear"
    />
  );
};
export default NewCommodityBatchForm;

export type NewCommodityBatchFormType = typeof NewCommodityBatchForm;
