"use client";

import { deleteCommodity, getAllCommoditiesWithBatches } from "@/lib/actions/commodityActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/dataTable/DataTable";

import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { commodityColumns } from "./commodityColumns";
import NewCommodityForm from "./NewCommodityForm";
import { DataTableContextProvider } from "../dataTable/dataTableContext";
import { deleteCommodityBatch } from "@/lib/actions/commodityBatchActions";
import { ReadCommodityBatchDBType, ReadCommodityDBType } from "@/lib/types";
import UpdateCommodityForm from "./UpdateCommodityForm";
import NewRecordDialog from "../forms/NewRecordDialog";
import UpdateRecordDialog from "../forms/UpdateRecordDialog";
import NewCommodityBatchForm from "../commodityBatches/NewCommodityBatchForm";
import UpdateCommodityBatchForm from "../commodityBatches/UpdateCommodityBatchForm";

const CommoditiesDataTable: React.FC = () => {
  const { toast } = useToast();

  const commoditySuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Materia prima eliminada con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const commodityBatchSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Lote eliminado con éxito",
    queryKeys: [["commodities"], ["stats"], ["charts"]],
  });

  const { mutate: mutateCommodity } = useMutation({
    mutationFn: (id: number) => deleteCommodity(id),
    onSuccess: commoditySuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateCommodityBatch } = useMutation({
    mutationFn: (id: number) => deleteCommodityBatch(id),
    onSuccess: commodityBatchSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = commodityColumns({ mutateCommodity, mutateCommodityBatch });

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

  const emptyCommodityData: ReadCommodityDBType = { name: "", created_at: "", id: 0, unit: null, user_id: "" };
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
      <NewRecordDialog RecordForm={NewCommodityForm} />
      <UpdateRecordDialog RecordForm={UpdateCommodityForm} />
      <NewRecordDialog RecordForm={NewCommodityBatchForm} isBatch={true} />
      <UpdateRecordDialog RecordForm={UpdateCommodityBatchForm} isBatch={true} />
    </DataTableContextProvider>
  );
};

export default CommoditiesDataTable;
