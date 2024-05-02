import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

type Props = { newItemLabel: string };

const NewItemButton: React.FC<Props> = ({ newItemLabel }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El botón de nuevo elemento no puede acceder al contexto de la tabla");
  const { setIsNewItemDialogOpen } = dataTableContext;

  return (
    <Button variant="default" asChild>
      <div className="flex flex-row gap-x-2 cursor-pointer" onClick={() => setIsNewItemDialogOpen(true)}>
        <CirclePlus strokeWidth={1.5} /> <span>{newItemLabel}</span>
      </div>
    </Button>
  );
};

export default NewItemButton;
