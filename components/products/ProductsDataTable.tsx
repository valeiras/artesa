"use client";

import React from "react";
import { deleteProduct, getAllProductsWithBatches } from "@/lib/actions/productActions";
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
    queryKeys: [["products"], ["stats"], ["charts"]],
  });

  const productBatchSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Lote eliminado con éxito",
    queryKeys: [["products"], ["stats"], ["charts"]],
  });

  const { mutate: mutateProduct } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: productSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateProductBatch } = useMutation({
    mutationFn: (id: number) => deleteProductBatch(id),
    onSuccess: productBatchSuccessHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  const columns = productColumns({ mutateProduct, mutateProductBatch });

  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductsWithBatches(),
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

  const emptyProductData: ReadProductDBType = { name: "", created_at: "", id: 0, unit: null, user_id: "" };
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
