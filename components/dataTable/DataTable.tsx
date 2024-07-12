"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination, DataTableColumnSelector, DataTableHeader, DataTableBody } from "@/components/dataTable";
import { NewItemButton } from "@/components/forms";

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
  newItemLabel: string;
  lookupField?: string;
  lookupPlaceholder?: string;
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    columnName: string;
    hasFixedWidth?: boolean;
  }
}

function DataTable<TData, TValue>({
  columns,
  data,
  newItemLabel,
  lookupField = "name",
  isPending,
  lookupPlaceholder = "Buscar por nombre",
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder={lookupPlaceholder}
          value={(table.getColumn(lookupField)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(lookupField)?.setFilterValue(event.target.value)}
          className="w-fit max-w-[160px] md:max-w-xs"
        />
        <DataTableColumnSelector table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columns={columns} isPending={isPending} />
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-5 gap-2">
        <NewItemButton newItemLabel={newItemLabel} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
