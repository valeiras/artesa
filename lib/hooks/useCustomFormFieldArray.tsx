import React, { HTMLInputTypeAttribute } from "react";
import { ArrayPath, FieldArray, FieldValues, Path, UseFormReturn, useFieldArray } from "react-hook-form";
import { FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import CustomFormField from "@/components/forms/CustomFormField";
import { AddButtonFieldArray, RemoveButtonFieldArray } from "@/components/forms/CustomFormFieldArrayButtons";

type CustomFormFieldArrayProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  objectField: string;
  form: UseFormReturn<T>;
  placeholder?: string;
  className?: string;
  hasVariableAmount?: boolean;
  label?: string;
  emptyValue?: FieldArray<T, ArrayPath<T>>;
  type?: HTMLInputTypeAttribute;
  gap?: string;
};

const useCustomFormFieldArray = <T extends FieldValues>({
  name,
  objectField,
  form,
  placeholder,
  className,
  hasVariableAmount = true,
  label,
  emptyValue,
  type,
  gap = "5",
}: CustomFormFieldArrayProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  function CustomFormFieldArray() {
    if (hasVariableAmount && !emptyValue)
      throw new Error("emptyValue is not defined. The variable amount will not work");
    return (
      <FormItem className={cn(`flex flex-1 flex-col h-full justify-start relative`, className)}>
        {label && <FormLabel className={`text-sm font-medium leading-none`}>{label}</FormLabel>}
        <div className={`flex flex-col h-full justify-between relative gap-${gap}`}>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex flex-row gap-1 items-center">
                <CustomFormField
                  control={form.control}
                  placeholder={placeholder}
                  hasLabel={false}
                  {...form.register(`${name}.${index}.${objectField}` as Path<T>)}
                  className="flex-1"
                  type={type}
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
  return { append, remove, CustomFormFieldArray };
};
export default useCustomFormFieldArray;
