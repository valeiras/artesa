import React from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table, flexRender } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

type Props<TData, TValue> = { table: Table<TData>; columns: ColumnDef<TData, TValue>[]; isPending: boolean };

export default function DataTableBody<TData, TValue>({
  table,
  columns,
  isPending,
}: Props<TData, TValue>): React.JSX.Element {
  const rows = table.getRowModel().rows;

  if (!rows?.length) {
    return (
      <TableBody>
        <TableRow>
          {isPending ? (
            columns.map((_, idx) => (
              <TableCell key={idx} className="h-24">
                <Skeleton className="h-4 w-3/4" />
              </TableCell>
            ))
          ) : (
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No hay ningún registro disponible.
            </TableCell>
          )}
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
