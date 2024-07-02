"use client";

import { deleteSupplier, getAllSuppliers } from "@/lib/actions/supplierActions";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable";
import { ReadSupplierDBType } from "@/lib/types";
import { UpdateItemDialog, NewItemDialog, DeleteAlertDialog } from "@/components/dialogs/";
import UpdateSupplierForm from "./UpdateSupplierForm";
import NewSupplierForm from "./NewSupplierForm";
import supplierColumns from "./supplierColumns";
import { useDatabase } from "@/lib/hooks";

const SuppliersDataTable: React.FC = () => {
  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Proveedor eliminado con éxito",
    queryKeys: [["suppliers"], ["stats"], ["charts"]],
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteSupplier({ recordId: id }),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = supplierColumns(mutate);

  const { dbData, isPending } = useDatabase({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(),
  });

  const emptySupplierData: ReadSupplierDBType = {
    address: "",
    created_at: "",
    email: "",
    id: 0,
    name: "",
    phone: "",
    user_id: "",
    comments: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptySupplierData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo proveedor" isPending={isPending} />
      <NewItemDialog RecordForm={NewSupplierForm} />
      <UpdateItemDialog RecordForm={UpdateSupplierForm} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default SuppliersDataTable;
