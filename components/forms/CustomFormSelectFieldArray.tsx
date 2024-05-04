import React, { useEffect } from "react";
import { Control, FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";
import CustomFormSelect from "./CustomFormSelect";
import { ProductFormValueType } from "@/lib/types";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { FormLabel, FormMessage } from "../ui/form";

type CustomFormSelectFieldArrayProps = {
  name: "ingredientIds";
  control: Control<ProductFormValueType>;
  register: UseFormRegister<ProductFormValueType>;
  errors: FieldErrors<ProductFormValueType>;
  items: { value: string; label?: string }[];
  placeholder?: string;
};

function CustomFormSelectFieldArray({
  name,
  control,
  register,
  errors,
  items,
  placeholder,
}: CustomFormSelectFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { required: "Selecciona al menos un ingrediente" },
  });

  return (
    <div className="space-y-2 flex flex-col h-full relative justify-start">
      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Ingredientes
      </FormLabel>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex flex-row gap-1 items-center -mt-1">
            <CustomFormSelect
              control={control}
              items={items}
              placeholder={placeholder}
              hasLabel={false}
              {...register(`${name}.${index}.id`)}
              className="flex-1"
            />
            <Button
              variant="destructive"
              type="button"
              onClick={() => {
                remove(index);
              }}
            >
              <Trash2 strokeWidth={2.0} size={18} />
            </Button>
          </div>
        );
      })}
      <Button
        type="button"
        onClick={() => {
          append({ id: "" });
        }}
      >
        <Plus strokeWidth={2.0} size={18} />
      </Button>
      <FormMessage className="absolute -bottom-6" />
      <p>{errors.ingredientIds?.message}</p>
    </div>
  );
}

export default CustomFormSelectFieldArray;
