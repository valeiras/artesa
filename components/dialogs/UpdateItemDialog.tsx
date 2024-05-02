import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import CustomDialog from "./CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const UpdateRecordDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");
  const { isUpdateItemDialogOpen, setIsUpdateItemDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isUpdateItemDialogOpen} setIsDialogOpen={setIsUpdateItemDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default UpdateRecordDialog;
