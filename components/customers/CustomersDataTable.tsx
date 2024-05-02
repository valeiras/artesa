"use client";

import { deleteCustomer, getAllCustomers } from "@/lib/actions/customerActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { customerColumns } from "./customerColumns";
import { DataTable, DataTableContextProvider } from "@/components/dataTable";
import { DeleteAlertDialog, NewItemDialog, UpdateItemDialog } from "@/components/dialogs/";
import { ReadCustomerDBType } from "@/lib/types";
import NewCustomerForm from "./NewCustomerForm";
import UpdateCustomerForm from "./UpdateCustomerForm";

const CustomersDataTable: React.FC = () => {
  const { toast } = useToast();

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Cliente eliminado con éxito",
    queryKeys: [["customers"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = customerColumns(mutate);

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getAllCustomers(),
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

  const emptyCustomerData: ReadCustomerDBType = {
    address: "",
    created_at: "",
    email: "",
    id: 0,
    name: "",
    phone: "",
    user_id: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptyCustomerData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo cliente" />
      <NewItemDialog RecordForm={NewCustomerForm} />
      <UpdateItemDialog RecordForm={UpdateCustomerForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default CustomersDataTable;
