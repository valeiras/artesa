import React from "react";
import { ArrayPath, FieldArray, FieldValues, Path, UseFormReturn, useFieldArray } from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import { AddButtonFieldArray, RemoveButtonFieldArray } from "./CustomFormFieldArrayButtons";

type CustomFormSelectFieldArrayProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  objectField: string;
  form: UseFormReturn<T>;
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
  objectField,
  form,
  commonItems,
  independentItems,
  placeholder,
  className,
  hasVariableAmount = true,
  label,
  emptyValue,
}: CustomFormSelectFieldArrayProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  return (
    <FormItem className={cn("flex flex-col h-full justify-between relative gap-5", className)}>
      {label && <FormLabel className="text-sm font-medium leading-none -mb-5">{label}</FormLabel>}
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex flex-row gap-1 items-center">
            <CustomFormSelect
              control={form.control}
              items={commonItems ? commonItems : independentItems?.[index] || []}
              placeholder={placeholder}
              hasLabel={false}
              {...form.register(`${name}.${index}.${objectField}` as Path<T>)}
              className="flex-1"
            />
            {hasVariableAmount && <RemoveButtonFieldArray remove={remove} index={index} />}
          </div>
        );
      })}
      {hasVariableAmount && <AddButtonFieldArray append={append} emptyValue={emptyValue} />}
    </FormItem>
  );
}

export default CustomFormSelectFieldArray;
