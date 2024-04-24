"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { commodityFormSchema, CommodityFormType, ReadCommodityWithBatchesType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { updateCommodity } from "@/lib/actions/commodityActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CommodityForm from "./CommodityForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

type Props = { commodityData: ReadCommodityWithBatchesType };
const UpdateCommodityForm: React.FC<Props> = ({ commodityData }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<CommodityFormType>({
    resolver: zodResolver(commodityFormSchema),
    defaultValues: { name: commodityData.name, unit: commodityData.unit || undefined },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Proveedor actualizado con éxito",
    queryKeys: [["commodity", commodityData.id], ["commodities"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CommodityFormType) => updateCommodity(values, commodityData.id),
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
      formHeader="Editar materia prima"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateCommodityForm;
