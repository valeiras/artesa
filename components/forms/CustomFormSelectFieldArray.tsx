import React from "react";
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { ProductFormValueType } from "@/lib/types";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

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
        {label && (
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </FormLabel>
        )}
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
              {hasVariableAmount && (
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Trash2 strokeWidth={2.0} size={18} />
                </Button>
              )}
            </div>
          );
        })}
        {hasVariableAmount && (
          <Button
            type="button"
            onClick={() => {
              if (emptyValue) append(emptyValue);
            }}
          >
            <Plus strokeWidth={2.0} size={18} />
          </Button>
        )}
        <FormMessage className="absolute -bottom-6" />
      </FormItem>
    </div>
  );
}

export default CustomFormSelectFieldArray;
