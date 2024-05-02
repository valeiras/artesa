import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import CustomDialog from "./CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const NewItemDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");
  const { isNewBatchDialogOpen, setIsNewBatchDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isNewBatchDialogOpen} setIsDialogOpen={setIsNewBatchDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default NewItemDialog;
