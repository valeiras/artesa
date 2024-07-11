import { ProductBatchFormValueType, ReadCommodityBatchDBType, ReadProductBatchDBType } from "@/lib/types/types";
import React, { useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { PRODUCT_PREFIX, COMMODITY_PREFIX } from "@/lib/constants";
import { CustomFormSelectFieldArray, CustomFormFieldArray } from "../forms";
import { UseFormReturn } from "react-hook-form";
import { useDatabase } from "@/lib/hooks";
import { Skeleton } from "../ui/skeleton";

function IngredientsSection<T extends ReadCommodityBatchDBType | ReadProductBatchDBType>({
  ingredients,
  getBatches,
  idField,
  prefix,
  ingredientType,
  form,
}: {
  ingredients: { id: string; name: string }[];
  getBatches: ({
    recordIds,
  }: {
    recordIds: number[];
  }) => Promise<{ dbData: T[] | null; dbError: PostgrestError | null }>;
  idField: keyof T;
  prefix: typeof PRODUCT_PREFIX | typeof COMMODITY_PREFIX;
  ingredientType: "product" | "commodity";
  form: UseFormReturn<ProductBatchFormValueType>;
}) {
  const ingredientIds = ingredients.map(({ id }) => parseInt(id));

  const { dbData, isPending } = useDatabase({
    queryKey: [`${ingredientType}Batches`, ...ingredients.map(({ id }) => id)],
    queryFn: () => getBatches({ recordIds: ingredientIds }),
  });

  const { items, ingredientsWithBatches } = organizeBatchesAndIngredients({
    ingredients,
    batchesData: dbData,
    idField,
  });

  return (
    <>
      <div className="flex flex-col gap-5 justify-between">
        {ingredientsWithBatches.map(({ name, id }) => {
          return (
            <div className="fake-input" key={`${prefix}${id}`}>
              {name}:
            </div>
          );
        })}
      </div>
      <CustomFormSelectFieldArray
        name={`${ingredientType}IngredientBatchIds`}
        objectField="id"
        form={form}
        independentItems={items}
        placeholder="Selecciona un lote"
        emptyPlaceholder="No hay lotes"
        hasVariableAmount={false}
        isPending={isPending}
      />
      <CustomFormFieldArray
        name={`${ingredientType}IngredientAmounts`}
        objectField="amount"
        form={form}
        placeholder="Cantidad empleada"
        hasVariableAmount={false}
        type="number"
      />
    </>
  );
}

const organizeBatchesAndIngredients = <T extends ReadCommodityBatchDBType | ReadProductBatchDBType>({
  ingredients,
  batchesData,
  idField,
}: {
  ingredients: { id: string; name: string }[];
  batchesData: T[] | null | undefined;
  idField: keyof T;
}) => {
  const ingredientsWithBatches = ingredients.map((it) => {
    const batches = batchesData
      ?.filter((batch) => batch[idField] === parseInt(it.id))
      .map(({ id, external_id }) => {
        return { id, external_id };
      });
    return { ...it, batches };
  });

  const items = ingredientsWithBatches.map(({ batches }) => {
    return (
      batches?.map(({ external_id, id }) => {
        return { value: String(id), label: external_id || "" };
      }) || []
    );
  });

  return { ingredientsWithBatches, items };
};

export default IngredientsSection;
