"use client";

import { deleteClient, getAllClients } from "@/lib/actions/clientActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { clientColumns } from "./clientColumns";
import { DataTable, DataTableContextProvider } from "@/components/dataTable";
import { DeleteAlertDialog, NewItemDialog, UpdateItemDialog } from "@/components/dialogs/";
import { ReadClientDBType } from "@/lib/types";
import NewClientForm from "./NewClientForm";
import UpdateClientForm from "./UpdateClientForm";
import checkDataFromDatabase from "@/lib/checkDataFromDatabase";

const ClientsDataTable: React.FC = () => {
  const { toast } = useToast();

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

  const { data, isPending } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getAllClients(),
  });

  if (isPending) return <h2>Cargando...</h2>;

  const { dbData } = checkDataFromDatabase(data, toast);
  if (!dbData) return null;

  const emptyClientData: ReadClientDBType = {
    address: "",
    created_at: "",
    email: "",
    id: 0,
    name: "",
    phone: "",
    user_id: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptyClientData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo cliente" />
      <NewItemDialog RecordForm={NewClientForm} />
      <UpdateItemDialog RecordForm={UpdateClientForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default ClientsDataTable;
