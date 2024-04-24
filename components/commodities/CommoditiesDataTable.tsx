"use client";

import { deleteCommodity, getAllCommoditiesWithBatches } from "@/lib/actions/commodityActions";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/dataTable/DataTable";

import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { commodityColumns } from "./commodityColumns";
import NewCommodityForm from "./NewCommodityForm";
import { DataTableContextProvider } from "../dataTable/dataTableContext";

const CommoditiesDataTable: React.FC = () => {
  const { toast } = useToast();

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Materia prima eliminada con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteCommodity(id),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = commodityColumns(mutate);

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["commodities"],
    queryFn: () => getAllCommoditiesWithBatches(),
  });

  if (isDataPending) return <h2>Cargando...</h2>;

  if (!data) {
    toast({ title: "Ha habido un error", variant: "destructive" });
    return null;
  }
  let { dbData, dbError } = data;

  if (dbError) {
    toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
    return null;
  }

  return (
    <DataTableContextProvider>
      <DataTable
        columns={columns}
        data={dbData || []}
        newItemLabel="Nueva materia prima"
        NewItemForm={<NewCommodityForm />}
      />
    </DataTableContextProvider>
  );
};

export default CommoditiesDataTable;
