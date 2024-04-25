import { ReadProductWithBatchesType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../RowActions";
import { DataTableColumnHeader } from "../dataTable/DataTableColumnHeader";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/units";
import BatchContainer from "../BatchContainer";
import UpdateProductForm from "./UpdateProductForm";
import UpdateProductBatchForm from "../productBatches/UpdateProductBatchForm";

export function productColumns({
  mutateProduct,
  mutateProductBatch,
}: {
  mutateProduct: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
  mutateProductBatch: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
}) {
  const columns: ColumnDef<ReadProductWithBatchesType>[] = [
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
          UpdateBatchForm={UpdateProductBatchForm}
          mutateBatch={mutateProductBatch}
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
        return (
          <RowActions
            deleteItemMutation={() => mutateProduct(item.id)}
            UpdateItemForm={<UpdateProductForm itemData={item} />}
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
