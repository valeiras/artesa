import React from "react";
import { ArrayPath, FieldArray, FieldValues, Path, UseFormReturn, useFieldArray } from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { FormItem, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";
import { AddButtonFieldArray, RemoveButtonFieldArray } from "./CustomFormFieldArrayButtons";

type CustomFormSelectFieldArrayProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  objectField: string;
  form: UseFormReturn<T>;
  commonItems?: { value: string; label?: string }[];
  independentItems?: { value: string; label: string }[][];
  placeholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  hasVariableAmount?: boolean;
  label?: string;
  emptyValue?: FieldArray<T, ArrayPath<T>>;
  gap?: string;
};

function CustomFormSelectFieldArray<T extends FieldValues>({
  name,
  objectField,
  form,
  commonItems,
  independentItems,
  placeholder,
  emptyPlaceholder,
  className,
  hasVariableAmount = true,
  label,
  emptyValue,
  gap = "5",
}: CustomFormSelectFieldArrayProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  return (
    <FormItem className={cn(`flex flex-col h-full justify-start relative`, className)}>
      {label && <FormLabel className={`text-sm font-medium leading-none`}>{label}</FormLabel>}
      <div className={`flex flex-col h-full justify-between relative gap-${gap}`}>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-row gap-1 items-center">
              <CustomFormSelect
                control={form.control}
                items={commonItems ? commonItems : independentItems?.[index] || []}
                placeholder={placeholder}
                emptyPlaceholder={emptyPlaceholder}
                hasLabel={false}
                {...form.register(`${name}.${index}.${objectField}` as Path<T>)}
                className="flex-1"
              />
              {hasVariableAmount && <RemoveButtonFieldArray remove={remove} index={index} />}
            </div>
          );
        })}
        {hasVariableAmount && <AddButtonFieldArray append={append} emptyValue={emptyValue} />}
      </div>
    </FormItem>
  );
}

export default CustomFormSelectFieldArray;
