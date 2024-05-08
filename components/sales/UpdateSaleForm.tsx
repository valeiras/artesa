"use client";

import React from "react";
import { saleFormSchema, isReadSaleDBType, SaleFormValueType } from "@/lib/types";
import { UpdateItemForm } from "@/components/forms";
import { updateSale } from "@/lib/actions/saleActions";
import { useDataTableContext } from "@/components/dataTable";
import SaleFormLayout from "./SaleFormLayout";
import { useQuery } from "@tanstack/react-query";
import { getProductId } from "@/lib/actions/productBatchActions";
import { getCommodityId } from "@/lib/actions/commodityBatchActions";

const UpdateSaleForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Falta el contexto de la tabla...");
  const { itemData } = dataTableContext;
  if (!isReadSaleDBType(itemData)) throw new Error("El tipo de artículo no coincide con el esperado");

  // We need to better define this query keys: we could have the same id for a commodity and a product
  const { data: productOrCommodityId, isPending: isProductOrCommodityIdPending } = useQuery({
    queryKey: ["productOrCommodityId", String(itemData.product_batch_id || itemData.commodity_batch_id)],
    queryFn: () =>
      itemData.product_batch_id
        ? getProductId(itemData.product_batch_id)
        : getCommodityId(itemData.commodity_batch_id as number),
  });

  const defaultValues: SaleFormValueType = {
    productOrCommodityId: String(productOrCommodityId?.dbData?.id || 0),
    batchId: String(itemData.product_batch_id) || String(itemData.commodity_batch_id) || "",
    amount: itemData.sold_amount || 0,
    clientId: String(itemData.client_id) || "",
    date: new Date(itemData.date),
  };

  return (
    <UpdateItemForm<SaleFormValueType>
      formSchema={saleFormSchema}
      defaultValues={defaultValues}
      successToastMessage="Proveedor actualizado con éxito"
      queryKeys={[
        ["sale", String(itemData.id)],
        ["productOrCommodityId", String(itemData.product_batch_id || itemData.commodity_batch_id)],
        ["sales"],
        ["stats"],
        ["charts"],
      ]}
      formHeader="Editar proveedor"
      updateRecordFn={updateSale}
      FormLayout={SaleFormLayout}
    />
  );
};

export default UpdateSaleForm;
