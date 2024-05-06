"use client";

import React from "react";
import { deleteProductAndRecipe, getAllProductsWithBatchesAndIngredients } from "@/lib/actions/productActions";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { DataTableContextProvider, DataTable } from "@/components/dataTable";
import { deleteProductBatch } from "@/lib/actions/productBatchActions";
import { ReadProductBatchDBType, ReadProductDBType } from "@/lib/types";
import { DeleteAlertDialog, NewBatchDialog, NewItemDialog, UpdateBatchDialog, UpdateItemDialog } from "../dialogs";
import productColumns from "./productColumns";
import NewProductForm from "./NewProductForm";
import UpdateProductForm from "./UpdateProductForm";
import NewProductBatchForm from "../productBatches/NewProductBatchForm";
import UpdateProductBatchForm from "../productBatches/UpdateProductBatchForm";

const ProductsDataTable: React.FC = () => {
  const { toast } = useToast();

  const productSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Producto eliminado con éxito",
    queryKeys: [["productsWithBatchesAndIngredients"], ["stats"], ["charts"]],
  });

  const productBatchSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Lote eliminado con éxito",
    queryKeys: [["productsWithBatchesAndIngredients"], ["stats"], ["charts"]],
  });

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: (id: number) => deleteProductAndRecipe(id),
    onSuccess: productSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteProductBatchMutation } = useMutation({
    mutationFn: (id: number) => deleteProductBatch(id),
    onSuccess: productBatchSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = productColumns({ deleteProductMutation, deleteProductBatchMutation });

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["productsWithBatchesAndIngredients"],
    queryFn: () => getAllProductsWithBatchesAndIngredients(),
  });

  if (isDataPending) return <h2>Cargando...</h2>;

  if (!data) {
    toast({ title: "Ha habido un error", variant: "destructive" });
    return null;
  }
  let { dbData, dbError } = data;

  if (dbError) {
    toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
    return null;
  }

  const emptyProductData: ReadProductDBType = {
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
