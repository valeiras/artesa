import { ReadProductWithBatchesAndIngredientsType } from "@/lib/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/dataTable";
import { UseMutateFunction } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { valueToLabel } from "@/lib/db/units";
import BatchContainer from "@/components/BatchContainer";
import { ItemRowActions } from "@/components/rowActions";
import RecipeContainer from "../RecipeContainer";

function productColumns({
  deleteProductMutation,
  deleteProductBatchMutation,
}: {
  deleteProductMutation: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
  deleteProductBatchMutation: UseMutateFunction<{ dbError: PostgrestError | null }, Error, number, unknown>;
}) {
  const columns: ColumnDef<ReadProductWithBatchesAndIngredientsType>[] = [
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
          mutateBatch={deleteProductBatchMutation}
          seeLinkbase="lotes/productos-finales"
        />
      ),
    },
    {
      accessorKey: "ingredients",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ingredientes" />,
      enableSorting: false,
      meta: { columnName: "Ingredientes" },
      cell: ({ row }) => <RecipeContainer itemData={row.original} />,
    },
    {
      accessorKey: "external_id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Referencia" />,
      meta: { columnName: "Referencia" },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <ItemRowActions
            deleteItemMutation={() => deleteProductMutation(item.id)}
            itemData={item}
            seeLink={`productos-finales/${row.original.id}`}
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

export default productColumns;
