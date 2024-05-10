"use client";

import React from "react";
import { SaleFormValueType, saleFormSchema } from "@/lib/types";
import { NewItemForm } from "@/components/forms";
import { createSale } from "@/lib/actions/saleActions";
import SaleFormLayout from "./SaleFormLayout";

const NewSaleForm: React.FC = () => {
  return (
    <NewItemForm<SaleFormValueType>
      formSchema={saleFormSchema}
      defaultValues={{ articleId: "", batchId: "", amount: 0, clientId: "", date: new Date(), externalId: "" }}
      successToastMessage="Nueva venta creada con éxito"
      queryKeys={[["sales"], ["stats"], ["charts"]]}
      formHeader="Nueva venta"
      createRecordFn={createSale}
      FormLayout={SaleFormLayout}
    />
  );
};

export default NewSaleForm;