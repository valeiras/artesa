"use client";

import { ReadSupplierDBType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { deleteSupplier, getAllSuppliers } from "@/lib/actions/supplierActions";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/DataTable";

import RowActions from "../RowActions";
import { useToast } from "../ui/use-toast";
import SuccessMessage from "../SuccesMessage";
import getSortableHeader from "@/lib/getSortableHeader";

const SuppliersDataTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess: ({ dbError }) => {
      if (dbError) {
        toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
        return;
      }

      toast({
        description: <SuccessMessage text="Proveedor eliminado con éxito" />,
      });
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const columns: ColumnDef<ReadSupplierDBType>[] = [
    {
      accessorKey: "name",
      header: getSortableHeader("Nombre"),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
    },
    {
      accessorKey: "address",
      header: "Dirección",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <RowActions id={item.id} deleteItemMutation={mutate} />;
      },
      size: 10,
    },
  ];

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  if (isDataPending) return <h2>Cargando...</h2>;

  if (!data) {
    toast({ title: "Ha habido un error", variant: "destructive" });
    return null;
  }
  const { dbData, dbError } = data;

  if (dbError) {
    toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
    return null;
  }

  return (
    <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo proveedor" newItemLink="/proveedores/nuevo" />
  );
};

export default SuppliersDataTable;
