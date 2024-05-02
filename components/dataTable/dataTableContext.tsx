import { createContext, useState, useContext } from "react";
import { ReadItemDBType } from "@/lib/types";

type DataTableContext = {
  isNewItemDialogOpen: boolean;
  setIsNewItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateItemDialogOpen: boolean;
  setIsUpdateItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: ReadItemDBType;
  setItemData: React.Dispatch<React.SetStateAction<ReadItemDBType>>;
} | null;

const DataTableContext = createContext<DataTableContext>(null);

export const useDataTableContext = () => {
  return useContext(DataTableContext);
};

export const DataTableContextProvider: React.FC<{ children: React.ReactNode; defaultItemData: ReadItemDBType }> = ({
  children,
  defaultItemData,
}) => {
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false);
  const [isUpdateItemDialogOpen, setIsUpdateItemDialogOpen] = useState(false);
  const [itemData, setItemData] = useState(defaultItemData);

  return (
    <DataTableContext.Provider
      value={{
        isNewItemDialogOpen,
        setIsNewItemDialogOpen,
        isUpdateItemDialogOpen,
        setIsUpdateItemDialogOpen,
        itemData,
        setItemData,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
