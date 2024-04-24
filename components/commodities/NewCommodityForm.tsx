"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { commodityFormSchema, CommodityFormType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { createCommodity } from "@/lib/actions/commodityActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const NewCommodityForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: "", unit: "kg" },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Materia prima creada con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityFormType) => createCommodity(values),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
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
