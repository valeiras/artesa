import { createContext, useState, useContext } from "react";

type DataTableContext = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

const DataTableContext = createContext<DataTableContext>(null);

export const useDataTableContext = () => {
  return useContext(DataTableContext);
};

export const DataTableContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <DataTableContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
