import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTableContext } from "../dataTable";

const RowActions = ({
  handleClick,
  deleteRecordMutation,
}: {
  handleClick: () => void;
  deleteRecordMutation: () => void;
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsDeleteAlertDialogOpen, setDeleteRecordFn } = dataTableContext;

  const EditButton = () => {
    return (
      <div className="flex flex-row gap-2 items-center cursor-pointer">
        <Pencil size={16} strokeWidth={1} /> Editar
      </div>
    );
  };

  const RemoveButton = () => {
    return (
      <div className="flex flex-row gap-2 items-center cursor-pointer">
        <Trash2 size={16} strokeWidth={1} /> Eliminar
      </div>
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-4 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleClick}>
            <EditButton />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteAlertDialogOpen(true);
              setDeleteRecordFn(() => deleteRecordMutation);
            }}
          >
            <RemoveButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RowActions;
