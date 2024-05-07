import React, { HTMLInputTypeAttribute } from "react";
import { ArrayPath, Control, FieldArray, FieldValues, Path, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";
import CustomFormField from "./CustomFormField";
import { AddButtonFieldArray, RemoveButtonFieldArray } from "./CustomFormFieldArrayButtons";

type CustomFormFieldArrayProps<T extends FieldValues> = {
  name: ArrayPath<T>;
  control: Control<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  className?: string;
  hasVariableAmount?: boolean;
  label?: string;
  emptyValue?: FieldArray<T, ArrayPath<T>>;
  type?: HTMLInputTypeAttribute;
};

function CustomFormFieldArray<T extends FieldValues>({
  name,
  control,
  register,
  placeholder,
  className,
  hasVariableAmount = true,
  label,
  emptyValue,
  type,
}: CustomFormFieldArrayProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  if (hasVariableAmount && !emptyValue) throw new Error("emptyValue is not defined. The variable amount will not work");

  return (
    <div>
      <FormItem className={cn("flex flex-col h-full justify-between relative", className)}>
        {label && <FormLabel className="text-sm font-medium leading-none">{label}</FormLabel>}
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-row gap-1 items-center -mt-1">
              <CustomFormField
                control={control}
                placeholder={placeholder}
                hasLabel={false}
                {...register(`${name}.${index}.id` as Path<T>)}
                className="flex-1"
                type={type}
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

export default CustomFormFieldArray;
