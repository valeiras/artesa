import React from "react";

import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  className?: string;
  hasLabel?: boolean;
  hasMessage?: boolean;
};

const CustomFormField = React.forwardRef<HTMLInputElement, CustomFormFieldProps>(function CustomFormField(
  { name, control, label, placeholder, disabled, type, className, hasLabel = true, hasMessage = true },
  ref
) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col h-full justify-between relative", className)}>
          {hasLabel && <FormLabel>{label || name}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} disabled={disabled} type={type} ref={ref} />
          </FormControl>
          {hasMessage && <FormMessage className="absolute -bottom-5" />}
        </FormItem>
      )}
    />
  );
});

export default CustomFormField;
