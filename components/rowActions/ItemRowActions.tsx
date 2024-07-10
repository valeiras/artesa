import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import { ReadItemDBType } from "@/lib/types";
import RowActions from "./RowActions";

const ItemRowActions = ({
  deleteItemMutation,
  itemData,
  seeLink,
}: {
  deleteItemMutation: () => void;
  itemData: ReadItemDBType;
  seeLink?: string;
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Las acciones de fila no pueden acceder al contexto de la tabla");

  const { setIsUpdateItemDialogOpen, setItemData } = dataTableContext;
  const handleClick = () => {
    setIsUpdateItemDialogOpen(true);
    setItemData(itemData);
  };

  return <RowActions handleClick={handleClick} deleteRecordMutation={deleteItemMutation} seeLink={seeLink} />;
};

export default ItemRowActions;
