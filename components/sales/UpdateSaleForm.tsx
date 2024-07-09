"use client";

import React from "react";
import { saleFormSchema, SaleFormValueType, isReadSaleType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateSale } from "@/lib/actions/saleActions";
import { useDataTableContext } from "@/components/dataTable";
import SaleFormLayout from "./SaleFormLayout";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";
import { createSaleRecipe, deleteSaleRecipeBySaleId } from "@/lib/actions/saleIngredientActions";

const UpdateSaleForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSaleType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  const articleIds = itemData.sale_ingredients.map(({ product_batches, commodity_batches }) => {
    return product_batches
      ? { id: `${PRODUCT_PREFIX}${product_batches.products.id}` }
      : { id: `${COMMODITY_PREFIX}${commodity_batches.commodities.id}` };
  });
  const batchIds = itemData.sale_ingredients.map(({ product_batches, commodity_batches }) => {
    return product_batches
      ? { id: `${PRODUCT_PREFIX}${product_batches.id}` }
      : { id: `${COMMODITY_PREFIX}${commodity_batches.id}` };
  });
  const amounts = itemData.sale_ingredients.map(({ sold_amount }) => {
    return { amount: sold_amount };
  });

  const defaultValues = {
    articleIds,
    batchIds,
    amounts,
    clientId: String(itemData.client_id),
    date: new Date(itemData.date),
    externalId: itemData.external_id,
    comments: itemData.comments,
  };

  return (
    <UpdateItemForm<SaleFormValueType>
      formSchema={saleFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Venta actualizada con éxito"
      queryKeys={[["sale", String(itemData.id)], ["sales"], ["stats"], ["charts"]]}
      formHeader="Editar venta"
      updateRecordFn={updateRecordFn}
      FormLayout={SaleFormLayout}
    />
  );
};

const updateRecordFn = async ({ values, recordId }: { values: SaleFormValueType; recordId: number }) => {
  const { dbError: dbErrorProduct } = await updateSale({ values, recordId });
  if (dbErrorProduct) return { dbError: dbErrorProduct };

  // TODO: improve this: we shouldn't blindly remove everything and create it again
  await deleteSaleRecipeBySaleId({ saleId: recordId });
  const { dbError: dbErrorRecipe } = await createSaleRecipe({
    values,
    saleId: recordId,
  });
  return { dbError: dbErrorRecipe };
};

export default UpdateSaleForm;
