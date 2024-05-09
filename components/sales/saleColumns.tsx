import { ReadSaleDBType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { ItemRowActions } from "@/components/rowActions";

function saleColumns(mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>) {
  const columns: ColumnDef<ReadSaleDBType>[] = [
    {
      accessorKey: "client_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
      meta: { columnName: "Cliente" },
    },
    {
      accessorKey: "product_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Producto" />,
      meta: { columnName: "Producto" },
    },
    {
      accessorKey: "batch",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lote" />,
      meta: { columnName: "Lote" },
    },
    {
      accessorKey: "amount",
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
