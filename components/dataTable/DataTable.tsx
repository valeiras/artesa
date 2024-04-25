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

import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "./DataTablePagination";
import DataTableColumnSelector from "./DataTableColumnSelector";
import CustomDialog from "../CustomDialog";
import { useDataTableContext } from "./dataTableContext";

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
  NewItemForm,
}: DataTableProps<TData, TValue> & {
  newItemLabel: string;
  NewItemForm: React.ComponentType;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { isDialogOpen, setIsDialogOpen } = dataTableContext;

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

  const NewItemButton = () => {
    return (
      <Button variant="default" asChild>
        <div className="flex flex-row gap-x-2 cursor-pointer">
          <CirclePlus strokeWidth={1.5} /> <span>{newItemLabel}</span>
        </div>
      </Button>
    );
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nombre..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
        <CustomDialog
          DialogTriggerContent={NewItemButton()}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        >
          <NewItemForm />
        </CustomDialog>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
