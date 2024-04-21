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

  const { mutate, isPending: isMutationPending } = useMutation({
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess: (dataOrError) => {
      if (dataOrError && "message" in dataOrError) {
        const error = dataOrError;
        toast({ title: "Ha habido un error", variant: "destructive", description: error.message });
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
  if (!data) return null;
  return <DataTable columns={columns} data={data} />;
};

export default SuppliersDataTable;
