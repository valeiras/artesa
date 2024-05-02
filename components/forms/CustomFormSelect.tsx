import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: { value: string; label?: string }[];
  label?: string;
  placeholder?: string;
};

function CustomFormSelect({ name, control, items, label, placeholder }: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col h-full justify-between pt-1 relative">
          <FormLabel>{label || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder || items[0].label || items[0].value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map(({ value, label }) => {
                return (
                  <SelectItem key={value} value={value}>
                    {label || value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="absolute -bottom-6" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormSelect;
