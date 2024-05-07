import React from "react";
import { CustomFormSelectFieldArray } from "../forms";
import CustomFormFieldArray from "../forms/CustomFormFieldArray";

type Props = {};

const CommodityIngredientsFields: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="flex flex-col space-y-2 h-full justify-between">
        {commodityIngredientsWithBatches.map(({ ingredient_name, ingredient_id }) => {
          return (
            <div className="fake-input -mt-1" key={`${COMMODITY_PREFIX}${ingredient_id}`}>
              {ingredient_name}:
            </div>
          );
        })}
      </div>
      <CustomFormSelectFieldArray
        name="commodityIngredientBatchIds"
        control={form.control}
        register={form.register}
        independentItems={commodityItems}
        placeholder="Selecciona un lote"
        hasVariableAmount={false}
      />
      <CustomFormFieldArray
        name="commodityIngredientAmounts"
        control={form.control}
        register={form.register}
        placeholder="Cantidad empleada"
        hasVariableAmount={false}
        type="number"
      />
    </>
  );
};

export default CommodityIngredientsFields;
