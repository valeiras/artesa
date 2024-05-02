import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import CustomDialog from "../CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const NewRecordDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");

  let isNewRecordDialogOpen: boolean, setIsNewRecordDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  if (isBatch) {
    const { isNewBatchDialogOpen, setIsNewBatchDialogOpen } = dataTableContext;
    isNewRecordDialogOpen = isNewBatchDialogOpen;
    setIsNewRecordDialogOpen = setIsNewBatchDialogOpen;
  } else {
    const { isNewItemDialogOpen, setIsNewItemDialogOpen } = dataTableContext;
    isNewRecordDialogOpen = isNewItemDialogOpen;
    setIsNewRecordDialogOpen = setIsNewItemDialogOpen;
  }

  return (
    <CustomDialog isDialogOpen={isNewRecordDialogOpen} setIsDialogOpen={setIsNewRecordDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default NewRecordDialog;
