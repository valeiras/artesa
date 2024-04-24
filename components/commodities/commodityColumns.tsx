import { ReadCommodityBatchDBType, ReadCommodityDBType, ReadCommodityWithBatchesType, UnitType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../RowActions";
import { DataTableColumnHeader } from "../DataTableColumnHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/units";
import BatchesContainer from "../BatchesContainer";
import { updateCommodity } from "@/lib/actions/commodityActions";
import UpdateCommodityForm from "./UpdateCommodityForm";

export function commodityColumns(
  mutate: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>
) {
  const columns: ColumnDef<ReadCommodityWithBatchesType>[] = [
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
        const unitValue = row.original["unit"];
        if (!unitValue) return null;
        return <>{valueToLabel[unitValue]}</>;
      },
    },
    {
      accessorKey: "batches",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Lotes" />,
      enableSorting: false,
      meta: { columnName: "Lotes" },
      cell: ({ row }) => <BatchesContainer row={row} itemAddress="materias-primas" />,
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
        return (
          <RowActions
            deleteItemMutation={() => mutate(item.id)}
            UpdateItemForm={<UpdateCommodityForm commodityData={item} />}
          />
        );
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
