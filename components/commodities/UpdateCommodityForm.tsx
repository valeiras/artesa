"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { commodityFormSchema, CommodityFormType } from "@/lib/types";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleCommodity, updateCommodity } from "@/lib/actions/commodityActions";
import { useEffect } from "react";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityForm";

type Props = { commodityId: number };
const UpdateCommodityForm: React.FC<Props> = ({ commodityId }) => {
  const { data } = useQuery({
    queryKey: ["commodity", commodityId],
    queryFn: () => getSingleCommodity(Number(commodityId)),
  });

  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: "", unit: "kg" },
  });

  useEffect(() => {
    if (data) {
      const { dbData } = data;
      form.setValue("name", dbData?.name || "");
      form.setValue("unit", dbData?.unit || "kg");
    }
  }, [data, form]);

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/proveedores",
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

  return <CommodityForm form={form} mutate={mutate} isPending={isPending} formHeader="Editar materia prima" />;
};
export default UpdateCommodityForm;
