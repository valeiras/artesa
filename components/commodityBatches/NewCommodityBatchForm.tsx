"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commodityBatchFormSchema, CommodityBatchFormType } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityBatchForm from "./CommodityBatchForm";
import { getSingleCommodity } from "@/lib/actions/commodityActions";

type Props = { commodityId: number };
const NewCommodityBatchForm: React.FC<Props> = ({ commodityId }) => {
  const { data: commodityData } = useQuery({
    queryKey: ["commodity", commodityId],
    queryFn: () => getSingleCommodity(commodityId),
  });

  const form = useForm<CommodityBatchFormType>({
    resolver: zodResolver(commodityBatchFormSchema),
    defaultValues: {
      commodityId: commodityData?.dbData.id,
      commodityName: commodityData?.dbData.name,
      supplierId: "",
      externalId: "",
      date: new Date(),
      initialAmount: undefined,
      comments: "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/materias-primas",
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
