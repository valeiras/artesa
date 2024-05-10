"use client";

import React from "react";
import { saleFormSchema, SaleFormValueType, isReadSaleType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateSale } from "@/lib/actions/saleActions";
import { useDataTableContext } from "@/components/dataTable";
import SaleFormLayout from "./SaleFormLayout";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";

const UpdateSaleForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSaleType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const articleId = itemData.commodity_batch_id
    ? `${COMMODITY_PREFIX}${itemData.commodity_batches?.commodities?.id}`
    : `${PRODUCT_PREFIX}${itemData.product_batches?.products?.id}`;
  const batchId = itemData.commodity_batch_id
    ? `${COMMODITY_PREFIX}${itemData.commodity_batch_id}`
    : `${PRODUCT_PREFIX}${itemData.product_batch_id}`;

  const defaultValues: SaleFormValueType = {
    articleId,
    batchId,
    clientId: String(itemData.client_id) || "",
    amount: itemData.sold_amount || 0,
    date: new Date(itemData.date),
    comments: itemData.comments || "",
    externalId: itemData.external_id || "",
  };

  return (
    <UpdateItemForm<SaleFormValueType>
      formSchema={saleFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Venta actualizada con éxito"
      queryKeys={[["sale", String(itemData.id)], ["sales"], ["stats"], ["charts"]]}
      formHeader="Editar venta"
      updateRecordFn={updateSale}
      FormLayout={SaleFormLayout}
    />
  );
};

export default UpdateSaleForm;
