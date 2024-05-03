import React, { useEffect } from "react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { ProductFormValueType } from "@/lib/types";

type CustomFormSelectFieldArrayProps = {
  name: "commodityIngredientIds" | "productIngredientIds";
  control: Control<ProductFormValueType>;
  register: UseFormRegister<ProductFormValueType>;
  items: { value: string; label?: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
};

function CustomFormSelectFieldArray({
  name,
  control,
  register,
  items,
  label,
  placeholder,
  className,
}: CustomFormSelectFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <section key={field.id}>
            <CustomFormSelect
              control={control}
              items={items}
              placeholder={placeholder}
              label={label}
              hasLabel={index === 0}
              {...register(`commodityIngredientIds.${index}.id`)}
            />
          </section>
        );
      })}
    </>
  );
}

export default CustomFormSelectFieldArray;
