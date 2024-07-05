import React from "react";
import { ReadSaleType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { ItemRowActions } from "@/components/rowActions";

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
          <div className="grid grid-cols-3 gap-2">
            {row.original.sale_ingredients.map(({ commodity_batches, product_batches, sold_amount }) => {
              return (
                <React.Fragment key={commodity_batches?.id || product_batches?.id}>
                  <div>{commodity_batches?.commodities?.name || product_batches?.products?.name}</div>
                  <div>{commodity_batches?.external_id || product_batches?.external_id}</div>
                  <div>{sold_amount}</div>
                </React.Fragment>
              );
            })}
          </div>
        );
      },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Producto" />,
      meta: { columnName: "Producto" },
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
