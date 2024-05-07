import React from "react";
import { ArrayPath, Control, FieldArray, FieldValues, Path, UseFormRegister, useFieldArray } from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { AddButtonFieldArray, RemoveButtonFieldArray } from "./CustomFormFieldArrayButtons";

type CustomFormSelectFieldArrayProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  commonItems?: { value: string; label?: string }[];
  independentItems?: { value: string; label: string }[][];
  placeholder?: string;
  className?: string;
  hasVariableAmount?: boolean;
  label?: string;
  emptyValue?: FieldArray<T, ArrayPath<T>>;
};

function CustomFormSelectFieldArray<T extends FieldValues>({
  name,
  control,
  register,
  commonItems,
  independentItems,
  placeholder,
  className,
  hasVariableAmount = true,
  label,
  emptyValue,
}: CustomFormSelectFieldArrayProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <FormItem className={cn("flex flex-col h-full justify-between relative", className)}>
        {label && <FormLabel className="text-sm font-medium leading-none">{label}</FormLabel>}
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-row gap-1 items-center -mt-1">
              <CustomFormSelect
                control={control}
                items={commonItems ? commonItems : independentItems?.[index] || []}
                placeholder={placeholder}
                hasLabel={false}
                {...register(`${name}.${index}.id` as Path<T>)}
                className="flex-1"
              />
              {hasVariableAmount && <RemoveButtonFieldArray remove={remove} index={index} />}
            </div>
          );
        })}
        {hasVariableAmount && <AddButtonFieldArray append={append} emptyValue={emptyValue} />}
        <FormMessage className="absolute -bottom-6" />
      </FormItem>
    </div>
  );
}

export default CustomFormSelectFieldArray;
