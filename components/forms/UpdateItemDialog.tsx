import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import CustomDialog from "../CustomDialog";

type Props = { ItemForm: React.FC };

const ItemDialog: React.FC<Props> = ({ ItemForm }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("El diálogo no puede acceder al contexto de la tabla");
  const { isUpdateItemDialogOpen, setIsUpdateItemDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isUpdateItemDialogOpen} setIsDialogOpen={setIsUpdateItemDialogOpen}>
      <ItemForm />
    </CustomDialog>
  );
};

export default ItemDialog;
