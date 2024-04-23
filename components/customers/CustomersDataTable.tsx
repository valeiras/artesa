"use client";

import { deleteCustomer, getAllCustomers } from "@/lib/actions/customerActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/DataTable";
import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { customerColumns } from "./customerColumns";

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

  return <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo cliente" newItemLink="/clientes/nuevo" />;
};

export default CustomersDataTable;
