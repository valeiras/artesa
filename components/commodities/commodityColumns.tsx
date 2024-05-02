import { ReadCommodityWithBatchesType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../rowActions/RowActions";
import { DataTableColumnHeader } from "../dataTable/DataTableColumnHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/units";
import BatchContainer from "../BatchContainer";
import UpdateCommodityForm from "./UpdateCommodityForm";
import UpdateCommodityBatchForm from "../commodityBatches/UpdateCommodityBatchForm";
import NewCommodityBatchForm from "../commodityBatches/NewCommodityBatchForm";
import ItemRowActions from "../rowActions/ItemRowActions";

export function commodityColumns({
  mutateCommodity,
  mutateCommodityBatch,
}: {
  mutateCommodity: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
  mutateCommodityBatch: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
}) {
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
      cell: ({ row }) => (
        <BatchContainer
          itemData={row.original}
          batches={row.original.batches || []}
          mutateBatch={mutateCommodityBatch}
        />
      ),
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
        return <ItemRowActions deleteItemMutation={() => mutateCommodity(item.id)} itemData={item} />;
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
