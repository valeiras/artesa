"use client";

import { deleteSale, getAllSales } from "@/lib/actions/saleActions";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuerySuccessHandler } from "@/lib/hooks/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable";
import { ReadSaleDBType } from "@/lib/types/types";
import { UpdateItemDialog, NewItemDialog, DeleteAlertDialog } from "@/components/dialogs/";
import UpdateSaleForm from "./UpdateSaleForm";
import NewSaleForm from "./NewSaleForm";
import saleColumns from "./saleColumns";
import { useDatabase } from "@/lib/hooks";

const SalesDataTable: React.FC = () => {
  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Venta eliminada con éxito",
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

  const { dbData, isPending } = useDatabase({
    queryKey: ["sales"],
    queryFn: () => getAllSales(),
  });

  const emptySaleData: ReadSaleDBType = {
    client_id: 0,
    created_at: "",
    id: 0,
    user_id: "",
    date: "",
    external_id: "",
    comments: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptySaleData}>
      <DataTable
        columns={columns}
        data={dbData || []}
        newItemLabel="Nueva venta"
        lookupField="product_name"
        lookupPlaceholder="Buscar por producto"
        isPending={isPending}
      />
      <NewItemDialog RecordForm={NewSaleForm} />
      <UpdateItemDialog RecordForm={UpdateSaleForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default SalesDataTable;
