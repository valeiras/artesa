import { ReadCommodityWithBatchesType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/units";
import { ItemRowActions } from "@/components/rowActions";
import BatchContainer from "@/components/BatchContainer";

function commodityColumns({
  deleteCommodityMutation,
  deleteCommodityBatchMutation,
}: {
  deleteCommodityMutation: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
  deleteCommodityBatchMutation: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
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
          mutateBatch={deleteCommodityBatchMutation}
          seeLinkbase="materias-primas"
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
        return <ItemRowActions deleteItemMutation={() => deleteCommodityMutation(item.id)} itemData={item} />;
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

export default commodityColumns;
