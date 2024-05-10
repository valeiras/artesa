import React from "react";
import CustomFormSelect from "../forms/CustomFormSelect";
import { useAvailableBatches } from "@/lib/hooks";
import { UseFormReturn } from "react-hook-form";
import { ReadCommodityBatchDBType, ReadProductBatchDBType, SaleFormValueType } from "@/lib/types";
import { getCommodityBatchesByCommodityId } from "@/lib/actions/commodityBatchActions";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "@/lib/constants";
import { PostgrestError } from "@supabase/supabase-js";
import { getProductBatchesByProductId } from "@/lib/actions/productBatchActions";
import { useQuery } from "@tanstack/react-query";

type Props = { articleId: string; form: UseFormReturn<SaleFormValueType> };

const CustomBatchSelector: React.FC<Props> = ({ articleId, form }) => {
  const { availableBatches, isPending } = useAvailableBatches(articleId);

  return (
    <CustomFormSelect
      name="batchId"
      items={isPending ? [] : availableBatches}
      control={form.control}
      label="Lote"
      placeholder={isPending ? "Cargando lotes" : "Selecciona un lote"}
      emptyPlaceholder="No hay lotes disponibles"
      className="justify-start"
    />
  );
};

export default CustomBatchSelector;
