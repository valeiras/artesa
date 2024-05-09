import { ProductBatchFormValueType, ReadCommodityBatchDBType, ReadProductBatchDBType } from "@/lib/types";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PostgrestError } from "@supabase/supabase-js";
import { PRODUCT_PREFIX, COMMODITY_PREFIX } from "@/lib/constants";
import { CustomFormSelectFieldArray, CustomFormFieldArray } from "../forms";
import { UseFormReturn } from "react-hook-form";

function IngredientsSection<T extends ReadCommodityBatchDBType | ReadProductBatchDBType>({
  itemId,
  ingredients,
  getBatches,
  idVar,
  prefix,
  ingredientType,
  form,
}: {
  itemId: number;
  ingredients: { ingredient_id: string; ingredient_name: string }[];
  getBatches: ({
    recordIds,
  }: {
    recordIds: number[];
  }) => Promise<{ dbData: T[] | null; dbError: PostgrestError | null }>;
  idVar: keyof T;
  prefix: typeof PRODUCT_PREFIX | typeof COMMODITY_PREFIX;
  ingredientType: "product" | "commodity";
  form: UseFormReturn<ProductBatchFormValueType>;
}) {
  const ingredientIds = ingredients.map(({ ingredient_id }) => parseInt(ingredient_id));

  const { data: batchesData, isPending: isBatchesDataPending } = useQuery({
    queryKey: [`${ingredientType}Batches`],
    queryFn: () => getBatches({ recordIds: ingredientIds }),
  });

  const ingredientsWithBatches = ingredients.map((it) => {
    const batches = batchesData?.dbData
      ?.filter((batch) => batch[idVar] === parseInt(it.ingredient_id))
      .map(({ id, external_id }) => {
        return { id, external_id };
      });
    return { ...it, batches };
  });

  const items = ingredientsWithBatches.map(({ batches }) => {
    return (
      batches?.map(({ external_id, id }) => {
        return { value: String(id), label: external_id };
      }) || []
    );
  });

  return (
    <>
      <div className="flex flex-col gap-5 justify-between">
        {ingredientsWithBatches.map(({ ingredient_name, ingredient_id }) => {
          return (
            <div className="fake-input" key={`${prefix}${ingredient_id}`}>
              {ingredient_name}:
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
        hasVariableAmount={false}
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

export default IngredientsSection;
