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
  loadingPlaceholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  hasLabel?: boolean;
  hasMessage?: boolean;
  forceRefresh?: number;
  isPending?: boolean;
};

const CustomFormSelect = React.forwardRef<HTMLDivElement, CustomFormSelectProps>(function CustomFormSelect(
  {
    name,
    control,
    items,
    label,
    placeholder,
    loadingPlaceholder = "Cargando...",
    emptyPlaceholder,
    className,
    hasLabel = true,
    hasMessage = true,
    forceRefresh,
    isPending = false,
  },
  ref
) {
  const conditionalPlaceholder: string =
    items.length < 1 ? emptyPlaceholder || placeholder || "" : placeholder || items?.[0].label || items?.[0].value;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col h-full justify-between relative", className)}>
          {hasLabel && <FormLabel>{label || name}</FormLabel>}
          {isPending ? (
            <div className="fake-input">{loadingPlaceholder}</div>
          ) : (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={items.length < 1}
              key={forceRefresh}
            >
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
          )}
          {hasMessage && <FormMessage className="absolute -bottom-5" />}
        </FormItem>
      )}
    />
  );
});

export default CustomFormSelect;
