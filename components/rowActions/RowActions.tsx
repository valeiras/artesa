import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTableContext } from "../dataTable";
import Link from "next/link";

const RowActions = ({
  handleClick,
  deleteRecordMutation,
  seeLink,
}: {
  handleClick: () => void;
  deleteRecordMutation: () => void;
  seeLink?: string;
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { setIsDeleteAlertDialogOpen, setDeleteRecordFn } = dataTableContext;

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
          {seeLink && (
            <Link href={seeLink}>
              <DropdownMenuItem>
                <SeeButton />
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const CustomButton = ({ Icon, label }: { Icon: LucideIcon; label: string }) => {
  return (
    <div className="flex flex-row gap-2 items-center cursor-pointer">
      <Icon size={16} strokeWidth={1} /> {label}
    </div>
  );
};

const EditButton: React.FC = () => CustomButton({ Icon: Pencil, label: "Editar" });
const RemoveButton: React.FC = () => CustomButton({ Icon: Trash2, label: "Eliminar" });
const SeeButton: React.FC = () => CustomButton({ Icon: Eye, label: "Ver" });
// => {
//   return (
//     <div className="flex flex-row gap-2 items-center cursor-pointer">
//       <Pencil size={16} strokeWidth={1} /> Editar
//     </div>
//   );
// };

// const RemoveButton = () => {
//   return (
//     <div className="flex flex-row gap-2 items-center cursor-pointer">
//       <Trash2 size={16} strokeWidth={1} /> Eliminar
//     </div>
//   );
// };

// const SeeButton = () => {};

export default RowActions;
