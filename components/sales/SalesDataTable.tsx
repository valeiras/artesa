"use client";

import { deleteSale, getAllSales } from "@/lib/actions/saleActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable";
import { ReadSaleDBType } from "@/lib/types";
import { UpdateItemDialog, NewItemDialog, DeleteAlertDialog } from "@/components/dialogs/";
import UpdateSaleForm from "./UpdateSaleForm";
import NewSaleForm from "./NewSaleForm";
import saleColumns from "./saleColumns";

const SalesDataTable: React.FC = () => {
  const { toast } = useToast();

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Proveedor eliminado con éxito",
    queryKeys: [["sales"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteSale({ recordId: id }),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = saleColumns(mutate);

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getAllSales(),
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

  const emptySaleData: ReadSaleDBType = {
    client_id: 0,
    commodity_batch_id: null,
    created_at: "",
    id: 0,
    product_batch_id: null,
    sold_amount: 0,
    user_id: null,
    date: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptySaleData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo proveedor" />
      <NewItemDialog RecordForm={NewSaleForm} />
      <UpdateItemDialog RecordForm={UpdateSaleForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default SalesDataTable;
