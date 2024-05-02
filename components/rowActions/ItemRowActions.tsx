import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import { ReadItemDBType } from "@/lib/types";
import RowActions from "./RowActions";

const ItemRowActions = ({
  deleteItemMutation,
  itemData,
}: {
  deleteItemMutation: () => void;
  itemData: ReadItemDBType;
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Las acciones de fila no pueden acceder al contexto de la tabla");

  const { setIsUpdateItemDialogOpen, setItemData } = dataTableContext;
  const handleClick = () => {
    setIsUpdateItemDialogOpen(true);
    setItemData(itemData);
  };

  return <RowActions handleClick={handleClick} deleteRecordMutation={deleteItemMutation} />;
};

export default ItemRowActions;
