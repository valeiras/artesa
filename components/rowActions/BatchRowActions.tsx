import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import { ReadBatchDBType, ReadItemDBType } from "@/lib/types";
import RowActions from "./RowActions";

const BatchRowActions = ({
  deleteBatchMutation,
  itemData,
  batchData,
  seeLink,
}: {
  deleteBatchMutation: () => void;
  itemData: ReadItemDBType;
  batchData: ReadBatchDBType;
  seeLink: string;
}) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Las acciones de fila no pueden acceder al contexto de la tabla");

  const { setIsUpdateBatchDialogOpen, setItemData, setBatchData } = dataTableContext;
  const handleClick = () => {
    setIsUpdateBatchDialogOpen(true);
    setItemData(itemData);
    setBatchData(batchData);
  };

  return <RowActions handleClick={handleClick} deleteRecordMutation={deleteBatchMutation} seeLink={seeLink} />;
};

export default BatchRowActions;
