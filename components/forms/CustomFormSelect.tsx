import React from "react";
import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: { value: string; label?: string }[];
  label?: string;
  placeholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  hasLabel?: boolean;
  hasMessage?: boolean;
};

const CustomFormSelect = React.forwardRef<HTMLDivElement, CustomFormSelectProps>(function CustomFormSelect(
  { name, control, items, label, placeholder, emptyPlaceholder, className, hasLabel = true, hasMessage = true },
  ref
) {
  let conditionalPlaceholder;
  if (items.length < 1) conditionalPlaceholder = emptyPlaceholder || placeholder || "";
  else conditionalPlaceholder = placeholder || items?.[0].label || items?.[0].value;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col h-full justify-between relative", className)}>
          {hasLabel && <FormLabel>{label || name}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={items.length < 1}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={conditionalPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map(({ value, label }) => {
                return (
                  <SelectItem key={value} value={value} ref={ref}>
                    {label || value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {hasMessage && <FormMessage className="absolute -bottom-5" />}
        </FormItem>
      )}
    />
  );
});

export default CustomFormSelect;
