import { createContext, useState, useContext } from "react";

type DataTableContext = {
  isItemDialogOpen: boolean;
  setIsItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

const DataTableContext = createContext<DataTableContext>(null);

export const useDataTableContext = () => {
  return useContext(DataTableContext);
};

export const DataTableContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);

  return (
    <DataTableContext.Provider
      value={{
        isItemDialogOpen,
        setIsItemDialogOpen,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
