import { createContext, useState, useContext } from "react";
import { ReadBatchDBType, ReadItemDBType } from "@/lib/types/types";

type DataTableContext = {
  isNewItemDialogOpen: boolean;
  setIsNewItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateItemDialogOpen: boolean;
  setIsUpdateItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: ReadItemDBType;
  setItemData: React.Dispatch<React.SetStateAction<ReadItemDBType>>;
  isNewBatchDialogOpen: boolean;
  setIsNewBatchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateBatchDialogOpen: boolean;
  setIsUpdateBatchDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  batchData?: ReadBatchDBType;
  setBatchData: React.Dispatch<React.SetStateAction<ReadBatchDBType | undefined>>;
  isDeleteAlertDialogOpen: boolean;
  setIsDeleteAlertDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteRecordFn: () => void;
  setDeleteRecordFn: React.Dispatch<React.SetStateAction<() => void>>;
} | null;

const DataTableContext = createContext<DataTableContext>(null);

export const useDataTableContext = () => {
  return useContext(DataTableContext);
};

export const DataTableContextProvider: React.FC<{
  children: React.ReactNode;
  defaultItemData: ReadItemDBType;
  defaultBatchData?: ReadBatchDBType;
}> = ({ children, defaultItemData, defaultBatchData }) => {
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [isUpdateItemDialogOpen, setIsUpdateItemDialogOpen] = useState(false);
  const [itemData, setItemData] = useState(defaultItemData);
  const [isNewBatchDialogOpen, setIsNewBatchDialogOpen] = useState(false);
  const [isUpdateBatchDialogOpen, setIsUpdateBatchDialogOpen] = useState(false);
  const [batchData, setBatchData] = useState(defaultBatchData);
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
  const [deleteRecordFn, setDeleteRecordFn] = useState(() => () => {});

  return (
    <DataTableContext.Provider
      value={{
        isNewItemDialogOpen,
        setIsNewItemDialogOpen,
        isUpdateItemDialogOpen,
        setIsUpdateItemDialogOpen,
        itemData,
        setItemData,
        isNewBatchDialogOpen,
        setIsNewBatchDialogOpen,
        isUpdateBatchDialogOpen,
        setIsUpdateBatchDialogOpen,
        batchData,
        setBatchData,
        isDeleteAlertDialogOpen,
        setIsDeleteAlertDialogOpen,
        deleteRecordFn,
        setDeleteRecordFn,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
