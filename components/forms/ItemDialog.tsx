import React from "react";
import { useDataTableContext } from "../dataTable/dataTableContext";
import CustomDialog from "../CustomDialog";

type Props = { ItemForm: React.FC };

const ItemDialog: React.FC<Props> = ({ ItemForm }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("DaEl diálogo no puede acceder al contexto de la tabla");
  const { isItemDialogOpen, setIsItemDialogOpen } = dataTableContext;

  return (
    <CustomDialog isDialogOpen={isItemDialogOpen} setIsDialogOpen={setIsItemDialogOpen}>
      <ItemForm />
    </CustomDialog>
  );
};

export default ItemDialog;
