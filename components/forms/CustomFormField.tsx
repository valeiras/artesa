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
};

function CustomFormField({ name, control, label, placeholder, disabled, type, className }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col h-full justify-between pt-1 relative", className)}>
          <FormLabel>{label || name}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} disabled={disabled} type={type} />
          </FormControl>
          <FormMessage className="absolute -bottom-6" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
