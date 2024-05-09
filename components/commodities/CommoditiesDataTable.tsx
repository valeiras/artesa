"use client";

import React from "react";
import { deleteCommodity, getAllCommoditiesWithBatches } from "@/lib/actions/commodityActions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable/";
import { deleteCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { ReadCommodityBatchDBType, ReadCommodityDBType } from "@/lib/types";
import { NewItemDialog, UpdateItemDialog, NewBatchDialog, UpdateBatchDialog, DeleteAlertDialog } from "../dialogs/";
import { NewCommodityBatchForm, UpdateCommodityBatchForm } from "@/components/commodityBatches/";
import commodityColumns from "./commodityColumns";
import NewCommodityForm from "./NewCommodityForm";
import UpdateCommodityForm from "./UpdateCommodityForm";

const CommoditiesDataTable: React.FC = () => {
  const { toast } = useToast();

  const commoditySuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Materia prima eliminada con éxito",
    queryKeys: [["commoditiesWithBatches"], ["stats"], ["charts"]],
  });

  const commodityBatchSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Lote eliminado con éxito",
    queryKeys: [["commoditiesWithBatches"], ["stats"], ["charts"]],
  });

  const { mutate: deleteCommodityMutation } = useMutation({
    mutationFn: (id: number) => deleteCommodity({ recordId: id }),
    onSuccess: commoditySuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteCommodityBatchMutation } = useMutation({
    mutationFn: (id: number) => deleteCommodityBatch({ recordId: id }),
    onSuccess: commodityBatchSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = commodityColumns({ deleteCommodityMutation, deleteCommodityBatchMutation });

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["commoditiesWithBatches"],
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

  const emptyCommodityData: ReadCommodityDBType = { name: "", created_at: "", id: 0, unit: "kg", user_id: "" };
  const emptyCommodityBatchData: ReadCommodityBatchDBType = {
    comments: "",
    commodity_id: 0,
    created_at: "",
    date: "",
    external_id: "",
    id: 0,
    initial_amount: 0,
    supplier_id: 0,
    user_id: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptyCommodityData} defaultBatchData={emptyCommodityBatchData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nueva materia prima" />
      <NewItemDialog RecordForm={NewCommodityForm} />
      <UpdateItemDialog RecordForm={UpdateCommodityForm} />
      <NewBatchDialog RecordForm={NewCommodityBatchForm} isBatch={true} />
      <UpdateBatchDialog RecordForm={UpdateCommodityBatchForm} isBatch={true} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default CommoditiesDataTable;
