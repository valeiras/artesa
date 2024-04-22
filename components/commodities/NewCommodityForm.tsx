"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect } from "../FormComponents";
import { availableUnits, commodityFormSchema, CommodityFormType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { createCommodity } from "@/lib/actions/commodityActions";
import FormButtons from "../FormButtons";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityForm";

const NewCommodityForm: React.FC = () => {
  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: "", unit: "" },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/clientes",
    successToastMessage: "Cliente creado con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityFormType) => createCommodity(values),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  return <CommodityForm form={form} mutate={mutate} isPending={isPending} formHeader="Nueva materia prima" />;
};
export default NewCommodityForm;
