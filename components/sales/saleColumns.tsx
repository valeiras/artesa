import React from "react";
import { ReadSaleType } from "@/lib/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { ItemRowActions } from "@/components/rowActions";
import CommentsContainer from "../CommentsContainer";

function saleColumns(mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>) {
  const columns: ColumnDef<ReadSaleType>[] = [
    {
      accessorKey: "client_name",
      accessorFn: (originalRow) => originalRow.clients.name,
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
      meta: { columnName: "Cliente" },
    },
    {
      accessorKey: "products",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2 justify-between">
            {row.original.sale_ingredients.map(({ commodity_batches, product_batches }) => {
              return (
                <div key={commodity_batches?.id || product_batches?.id}>
                  {commodity_batches?.commodities?.name || product_batches?.products?.name}
                </div>
              );
            })}
          </div>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Producto" />,
      meta: { columnName: "Producto" },
    },
    {
      accessorKey: "batches",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2 justify-between">
            {row.original.sale_ingredients.map(({ commodity_batches, product_batches, sold_amount }) => {
              return (
                <div key={commodity_batches?.id || product_batches?.id}>
                  {commodity_batches?.external_id || product_batches?.external_id}
                </div>
              );
            })}
          </div>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lotes" />,
      meta: { columnName: "Lotes" },
    },
    {
      accessorKey: "quantity",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-2 justify-between h-full">
            {row.original.sale_ingredients.map(({ commodity_batches, product_batches, sold_amount }) => {
              return <div key={commodity_batches?.id || product_batches?.id}>{sold_amount}</div>;
            })}
          </div>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cantidad" />,
      meta: { columnName: "Cantidad" },
    },
    {
      accessorKey: "external_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Identificador" />,
      meta: { columnName: "Identificador" },
    },
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de venta" />,
      meta: { columnName: "Fecha venta" },
      cell: ({ row }) => {
        const formattedDate = new Date(row.getValue("date")).toLocaleDateString();
        return <>{formattedDate}</>;
      },
    },
    {
      accessorKey: "comments",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Comentarios" />,
      enableSorting: false,
      meta: { columnName: "Comentarios" },
      cell: ({ row }) => <CommentsContainer comments={row.original.comments} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <ItemRowActions deleteItemMutation={() => mutate(item.id)} itemData={item} />;
      },
      size: 5,
      minSize: 5,
      enableHiding: false,
      enableSorting: false,
      meta: { columnName: "Acciones", hasFixedWidth: true },
    },
  ];
  return columns;
}

export default saleColumns;
