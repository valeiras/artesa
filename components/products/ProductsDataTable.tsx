"use client";

import React from "react";
import { deleteProduct, getAllProductsWithBatchesAndIngredients } from "@/lib/actions/productActions";
import { useMutation } from "@tanstack/react-query";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable";
import { deleteProductBatch } from "@/lib/actions/productBatchActions";
import { ReadProductBatchDBType, ReadProductDBType } from "@/lib/types";
import { DeleteAlertDialog, NewBatchDialog, NewItemDialog, UpdateBatchDialog, UpdateItemDialog } from "../dialogs";
import { useDatabaseData } from "@/lib/hooks";
import productColumns from "./productColumns";
import NewProductForm from "./NewProductForm";
import UpdateProductForm from "./UpdateProductForm";
import NewProductBatchForm from "../productBatches/NewProductBatchForm";
import UpdateProductBatchForm from "../productBatches/UpdateProductBatchForm";

const ProductsDataTable: React.FC = () => {
  const productSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Producto eliminado con éxito",
    queryKeys: [["productsWithBatchesAndIngredients"], ["stats"], ["charts"]],
  });

  const productBatchSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Lote eliminado con éxito",
    queryKeys: [["productsWithBatchesAndIngredients"], ["stats"], ["charts"]],
  });

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: (id: number) => deleteProduct({ recordId: id }),
    onSuccess: productSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteProductBatchMutation } = useMutation({
    mutationFn: (id: number) => deleteProductBatch({ recordId: id }),
    onSuccess: productBatchSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = productColumns({ deleteProductMutation, deleteProductBatchMutation });

  const { dbData, isPending } = useDatabaseData({
    queryKey: ["productsWithBatchesAndIngredients"],
    queryFn: () => getAllProductsWithBatchesAndIngredients(),
  });
  if (isPending) return <h2>Cargando...</h2>;
  if (!dbData) return null;

  const emptyProductData: ReadProductDBType = {
    external_id: "",
    name: "",
    created_at: "",
    id: 0,
    unit: "kg",
    user_id: "",
  };

  const emptyProductBatchData: ReadProductBatchDBType = {
    comments: "",
    product_id: 0,
    created_at: "",
    date: "",
    external_id: "",
    id: 0,
    initial_amount: 0,
    user_id: "",
  };

  return (
    <DataTableContextProvider defaultItemData={emptyProductData} defaultBatchData={emptyProductBatchData}>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nuevo producto" />
      <NewItemDialog RecordForm={NewProductForm} />
      <UpdateItemDialog RecordForm={UpdateProductForm} />
      <NewBatchDialog RecordForm={NewProductBatchForm} isBatch={true} />
      <UpdateBatchDialog RecordForm={UpdateProductBatchForm} isBatch={true} />
      <DeleteAlertDialog />
    </DataTableContextProvider>
  );
};

export default ProductsDataTable;
