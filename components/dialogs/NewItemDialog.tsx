import React from "react";
import { useDataTableContext } from "@/components/dataTable";
import CustomDialog from "./CustomDialog";

type Props = { RecordForm: React.FC; isBatch?: boolean };

const NewItemDialog: React.FC<Props> = ({ RecordForm, isBatch = false }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");
  const { isNewItemDialogOpen, setIsNewItemDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isNewItemDialogOpen} setIsDialogOpen={setIsNewItemDialogOpen}>
      <RecordForm />
    </CustomDialog>
  );
};

export default NewItemDialog;
