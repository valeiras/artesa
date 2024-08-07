"use client";

import { deleteClient, getAllClients } from "@/lib/actions/clientActions";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuerySuccessHandler } from "@/lib/hooks/useQuerySuccessHandler";
import { clientColumns } from "./clientColumns";
import { DataTable, DataTableContextProvider } from "@/components/dataTable";
import { DeleteAlertDialog, NewItemDialog, UpdateItemDialog } from "@/components/dialogs/";
import { ReadClientDBType } from "@/lib/types/types";
import { useDatabase } from "@/lib/hooks/";
import NewClientForm from "./NewClientForm";
import UpdateClientForm from "./UpdateClientForm";

const ClientsDataTable: React.FC = () => {
  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Cliente eliminado con éxito",
    queryKeys: [["clients"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteClient({ recordId: id }),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = clientColumns(mutate);

  const { dbData, isPending } = useDatabase({ queryKey: ["clients"], queryFn: () => getAllClients() });

  const emptyClientData: ReadClientDBType = {
    address: "",
    created_at: "",
    email: "",
    id: 0,
    name: "",
    phone: "",
    user_id: "",
    comments: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptyClientData}>
      <DataTable columns={columns} data={dbData || []} isPending={isPending} newItemLabel="Nuevo cliente" />
      <NewItemDialog RecordForm={NewClientForm} />
      <UpdateItemDialog RecordForm={UpdateClientForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default ClientsDataTable;
