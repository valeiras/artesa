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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination, DataTableColumnSelector, useDataTableContext } from "@/components/dataTable";
import { NewItemButton } from "@/components/forms";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
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
  lookupPlaceholder = "Buscar por nombre",
}: DataTableProps<TData, TValue> & {
  newItemLabel: string;
  lookupField?: string;
  lookupPlaceholder?: string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");

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
      <div className="flex items-center py-4">
        <Input
          placeholder={lookupPlaceholder}
          value={(table.getColumn(lookupField)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(lookupField)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DataTableColumnSelector table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.column.columnDef.meta?.hasFixedWidth ? `${header.getSize()}px` : "" }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay ningún registro disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row justify-between mt-5">
        <NewItemButton newItemLabel={newItemLabel} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
