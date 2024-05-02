import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { ReadItemDBType } from "@/lib/types";
import { useDataTableContext } from "./dataTable/dataTableContext";

type Props = { deleteItemMutation: () => void; itemData: ReadItemDBType };
const RowActions: React.FC<Props> = ({ deleteItemMutation, itemData }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Las acciones de fila no pueden acceder al contexto de la tabla");
  const { setIsUpdateItemDialogOpen, setItemData } = dataTableContext;

  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
          <DropdownMenuItem
            onClick={() => {
              setIsUpdateItemDialogOpen(true);
              setItemData(itemData);
            }}
          >
            <EditButton />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
            <RemoveButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAlertDialog isAlertOpen={isAlertOpen} setIsAlertOpen={setIsAlertOpen} deleteItem={deleteItemMutation} />
    </>
  );
};

export default RowActions;
