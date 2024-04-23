"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commodityFormSchema, CommodityFormType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { createCommodity } from "@/lib/actions/commodityActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityForm";

const NewCommodityForm: React.FC = () => {
  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: "", unit: "kg" },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/materias-primas",
    successToastMessage: "Materia prima creada con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityFormType) => createCommodity(values),
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
      formHeader="Nueva materia prima"
      submitButtonLabel="Crear"
    />
  );
};
export default NewCommodityForm;
