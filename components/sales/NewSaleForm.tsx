"use client";

import React from "react";
import { SaleFormValueType, saleFormSchema } from "@/lib/types/types";
import { NewItemForm } from "@/components/forms";
import { createSale } from "@/lib/actions/saleActions";
import SaleFormLayout from "./SaleFormLayout";
import { createSaleRecipe } from "@/lib/actions/saleIngredientActions";

const createRecordFn = async ({ values }: { values: SaleFormValueType }) => {
  const { dbError: dbErrorProduct, dbData } = await createSale({ values });
  if (dbErrorProduct || !dbData) return { dbError: dbErrorProduct };

  const { dbError: dbErrorRecipe } = await createSaleRecipe({
    values,
    saleId: dbData.id,
  });
  return { dbError: dbErrorRecipe };
};

const NewSaleForm: React.FC = () => {
  return (
    <NewItemForm<SaleFormValueType>
      formSchema={saleFormSchema}
      defaultValues={{
        articleIds: [{ id: "" }],
        batchIds: [{ id: "" }],
        amounts: [{ amount: 0 }],
        clientId: "",
        date: new Date(),
        externalId: "",
        comments: "",
      }}
      successToastMessage="Nueva venta creada con éxito"
      queryKeys={[["sales"], ["stats"], ["charts"]]}
      formHeader="Nueva venta"
      createRecordFn={createRecordFn}
      FormLayout={SaleFormLayout}
    />
  );
};

export default NewSaleForm;
