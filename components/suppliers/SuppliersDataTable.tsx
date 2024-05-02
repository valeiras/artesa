"use client";

import { deleteSupplier, getAllSuppliers } from "@/lib/actions/supplierActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/dataTable/DataTable";

import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { supplierColumns } from "./supplierColumns";
import NewSupplierForm from "./NewSupplierForm";
import { DataTableContextProvider } from "../dataTable/dataTableContext";

const SuppliersDataTable: React.FC = () => {
  const { toast } = useToast();

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Proveedor eliminado con éxito",
    queryKeys: [["suppliers"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = supplierColumns(mutate);

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
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
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo proveedor" NewItemForm={NewSupplierForm} />
    </DataTableContextProvider>
  );
};

export default SuppliersDataTable;
