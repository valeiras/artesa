import { ReadCustomerDBType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../RowActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";

export function customerColumns(mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>) {
  const columns: ColumnDef<ReadCustomerDBType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
      meta: { columnName: "Nombre" },
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
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de creación" />,
      meta: { columnName: "Fecha" },
      cell: ({ row }) => {
        const formattedDate = new Date(row.getValue("created_at")).toLocaleDateString();
        return <>{formattedDate}</>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <RowActions id={item.id} deleteItemMutation={mutate} itemAddress="clientes" />;
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
