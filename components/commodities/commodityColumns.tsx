import { ReadCommodityDBType, UnitType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../RowActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/units";

export function commodityColumns(
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>
) {
  const columns: ColumnDef<ReadCommodityDBType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
      meta: { columnName: "Nombre" },
    },
    {
      accessorKey: "unit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Unidad de medida" />,
      enableSorting: false,
      meta: { columnName: "Unidad" },
      cell: ({ row }) => {
        const unitValue = row.getValue("unit") as UnitType;
        return <>{valueToLabel[unitValue]}</>;
      },
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
        return <RowActions id={item.id} deleteItemMutation={mutate} itemAddress="materias-primas" />;
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
