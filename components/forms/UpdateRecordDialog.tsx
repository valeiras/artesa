import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import CustomDialog from "../CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const UpdateRecordDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");

  let isUpdateRecordDialogOpen: boolean, setIsUpdateRecordDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  if (isBatch) {
    const { isUpdateBatchDialogOpen, setIsUpdateBatchDialogOpen } = dataTableContext;
    isUpdateRecordDialogOpen = isUpdateBatchDialogOpen;
    setIsUpdateRecordDialogOpen = setIsUpdateBatchDialogOpen;
  } else {
    const { isUpdateItemDialogOpen, setIsUpdateItemDialogOpen } = dataTableContext;
    isUpdateRecordDialogOpen = isUpdateItemDialogOpen;
    setIsUpdateRecordDialogOpen = setIsUpdateItemDialogOpen;
  }

  return (
    <CustomDialog isDialogOpen={isUpdateRecordDialogOpen} setIsDialogOpen={setIsUpdateRecordDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default UpdateRecordDialog;
