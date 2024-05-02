"use client";

import { ReadProductDBType, productBatchFormSchema } from "@/lib/types";
import NewItemForm from "../forms/NewItemForm";

import React from "react";
import { createProductBatch } from "@/lib/actions/productBatchActions";
import ProductBatchForm from "./ProductBatchForm";

const NewProductBatchForm: React.FC<{ itemData: ReadProductDBType }> = ({ itemData }) => {
  return (
    <NewItemForm
      formSchema={productBatchFormSchema}
      defaultValues={{
        productId: String(itemData.id),
        productName: itemData.name,
        externalId: "",
        date: new Date(),
        initialAmount: 0,
        comments: "",
      }}
      successToastMessage="Nuevo lote creado con éxito"
      queryKeys={[["products"], ["stats"], ["charts"]]}
      formHeader="Nuevo lote"
      createItemFn={createProductBatch}
      ItemForm={ProductBatchForm}
    />
  );
};

export default NewProductBatchForm;

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { productBatchFormSchema, ProductBatchFormValueType, ReadProductWithBatchesType } from "@/lib/types";
// import { useMutation } from "@tanstack/react-query";
// import { createProductBatch } from "@/lib/actions/productBatchActions";
// import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
// import ProductBatchForm from "./ProductBatchForm";

// type Props = { itemData: ReadProductWithBatchesType };
// const NewProductBatchForm: React.FC<Props> = ({ itemData }) => {
//   const form = useForm<ProductBatchFormValueType>({
//     resolver: zodResolver(productBatchFormSchema),
//     defaultValues: {
//       productId: String(itemData.id),
//       productName: itemData.name,
//       externalId: "",
//       date: new Date(),
//       initialAmount: 0,
//       comments: "",
//     },
//   });

//   const successHandler = useQuerySuccessHandler({
//     successToastMessage: "Lote creado con éxito",
//     queryKeys: [["products"], ["stats"], ["charts"]],
//   });

//   const { mutate, isPending } = useMutation({
//     mutationFn: (values: ProductBatchFormValueType) => createProductBatch(values),
//     onSuccess: successHandler,
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   return (
//     <ProductBatchForm
//       form={form}
//       mutate={mutate}
//       isPending={isPending}
//       formHeader="Nuevo lote"
//       submitButtonLabel="Crear"
//     />
//   );
// };
// export default NewProductBatchForm;

// export type NewProductBatchFormType = typeof NewProductBatchForm;
