"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commodityBatchFormSchema, CommodityBatchFormType, ReadCommodityWithBatchesType } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityBatchForm from "./CommodityBatchForm";

type Props = { commodityData: ReadCommodityWithBatchesType };
const NewCommodityBatchForm: React.FC<Props> = ({ commodityData }) => {
  const form = useForm<CommodityBatchFormType>({
    resolver: zodResolver(commodityBatchFormSchema),
    defaultValues: {
      commodityId: commodityData.id,
      commodityName: commodityData.name,
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
    mutationFn: (values: CommodityBatchFormType) => createCommodityBatch(values),
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
