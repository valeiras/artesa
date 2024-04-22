"use client";

import { ReadCommodityDBType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { deleteCommodity, getAllCommodities } from "@/lib/actions/commodityActions";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/DataTable";

import RowActions from "../RowActions";
import { useToast } from "../ui/use-toast";
import SuccessMessage from "../SuccesMessage";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

const CommoditiesDataTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteCommodity(id),
    onSuccess: ({ dbError }) => {
      if (dbError) {
        toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
        return;
      }

      toast({
        description: <SuccessMessage text="Materia prima eliminado con éxito" />,
      });
      queryClient.invalidateQueries({ queryKey: ["commodities"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const columns: ColumnDef<ReadCommodityDBType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
      meta: { columnName: "Nombre" },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de creación" />,
      meta: { columnName: "Fecha" },
      cell: ({ row }) => {
        const formattedDate = new Date(row.getValue("created_at")).toLocaleDateString();
        return <>{formattedDate}</>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      meta: { columnName: "Email" },
      enableSorting: false,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Teléfono" />,
      enableSorting: false,
      meta: { columnName: "Teléfono" },
    },
    {
      accessorKey: "address",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Dirección" />,
      enableSorting: false,
      meta: { columnName: "Dirección" },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <RowActions id={item.id} deleteItemMutation={mutate} itemAddress="materias-primas" />;
      },
      size: 5,
      minSize: 5,
      enableHiding: false,
      enableSorting: false,
      meta: { columnName: "Acciones", hasFixedWidth: true },
    },
  ];

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["commodities"],
    queryFn: () => getAllCommodities(),
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

  return <DataTable columns={columns} data={dbData || []} newItemLabel="Nueva materia prima" newItemLink="/materias-primas/nueva" />;
};

export default CommoditiesDataTable;
