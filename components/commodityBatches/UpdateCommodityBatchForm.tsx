"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { commodityFormSchema, CommodityFormType } from "@/lib/types";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleCommodity, updateCommodity } from "@/lib/actions/commodityActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityBatchForm";

type Props = { commodityId: number };
const UpdateCommodityForm: React.FC<Props> = ({ commodityId }) => {
  const { data } = useQuery({
    queryKey: ["commodity", commodityId],
    queryFn: () => getSingleCommodity(Number(commodityId)),
  });

  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: data?.dbData?.name, unit: data?.dbData?.unit || undefined },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/materias-primas",
    successToastMessage: "Proveedor actualizado con éxito",
    queryKeys: [["commodity", commodityId], ["commodities"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityFormType) => updateCommodity(values, commodityId),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <CommodityForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar materia prima"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateCommodityForm;
