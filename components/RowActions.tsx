import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import DeleteAlertDialog from "@/components/DeleteAlertDialog";

type Props = { id: number; deleteItemMutation: (id: number) => void; itemAddress: string };
const RowActions: React.FC<Props> = ({ id, deleteItemMutation, itemAddress }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/${itemAddress}/${id}`} className="flex flex-row gap-2 items-center">
              <Pencil size={16} strokeWidth={1} /> Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="flex flex-row gap-2 items-center cursor-pointer"
              onClick={() => {
                setIsAlertOpen(true);
              }}
            >
              <Trash2 size={16} strokeWidth={1} /> Eliminar
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        deleteItem={() => deleteItemMutation(id)}
      />
    </>
  );
};

export default RowActions;
