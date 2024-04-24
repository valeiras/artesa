"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productFormSchema, ProductFormValueType, ReadProductWithBatchesType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/lib/actions/productActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import ProductForm from "./ProductForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

type Props = { productData: ReadProductWithBatchesType };
const UpdateProductForm: React.FC<Props> = ({ productData }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<ProductFormValueType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: productData.name, unit: productData.unit || undefined },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Producto actualizado con éxito",
    queryKeys: [["product", productData.id], ["products"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProductFormValueType) => updateProduct(values, productData.id),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ProductForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar materia prima"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateProductForm;
