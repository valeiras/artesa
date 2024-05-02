import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import CustomDialog from "../CustomDialog";

type Props = { ItemForm: React.FC };

const NewItemDialog: React.FC<Props> = ({ ItemForm }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("DaEl diálogo no puede acceder al contexto de la tabla");
  const { isNewItemDialogOpen, setIsNewItemDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isNewItemDialogOpen} setIsDialogOpen={setIsNewItemDialogOpen}>
      <ItemForm />
    </CustomDialog>
  );
};

export default NewItemDialog;
