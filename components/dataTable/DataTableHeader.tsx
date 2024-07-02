import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table, flexRender } from "@tanstack/react-table";

type Props<TData> = { table: Table<TData> };

export default function DataTableHeader<TData>({ table }: Props<TData>): React.JSX.Element {
  return (
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
  );
}
