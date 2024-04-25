"use client";

import { deleteProduct, getAllProductsWithBatches } from "@/lib/actions/productActions";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import DataTable from "@/components/dataTable/DataTable";

import { useToast } from "../ui/use-toast";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import { productColumns } from "./productColumns";
import NewProductForm from "./NewProductForm";
import { DataTableContextProvider } from "../dataTable/dataTableContext";
import { deleteProductBatch } from "@/lib/actions/productBatchActions";

const ProductsDataTable: React.FC = () => {
  const { toast } = useToast();

  const productSuccessHandler = useQuerySuccessHandler({
    successToastMessage: "Productos eliminada con éxito",
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

  return (
    <DataTableContextProvider>
      <DataTable columns={columns} data={dbData || []} newItemLabel="Nueva producto" NewItemForm={NewProductForm} />
    </DataTableContextProvider>
  );
};

export default ProductsDataTable;
