import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import CustomDialog from "./CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const UpdateBatchDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");

  const { isUpdateBatchDialogOpen, setIsUpdateBatchDialogOpen } = dataTableContext;
  return (
    <CustomDialog isDialogOpen={isUpdateBatchDialogOpen} setIsDialogOpen={setIsUpdateBatchDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default UpdateBatchDialog;
