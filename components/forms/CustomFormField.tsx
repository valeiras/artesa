import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/ui/input";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
};

function CustomFormField({ name, control, label, placeholder, disabled, type }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col h-full justify-between pt-1 relative">
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
