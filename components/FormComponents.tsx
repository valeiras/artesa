import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
};

type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: { value: string; label?: string }[];
  label?: string;
  placeholder?: string;
};

type CustomFormCheckboxProps = {
  name: string;
  control: Control<any>;
  label?: string;
};

export function CustomFormField({ name, control, label, placeholder }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label || name}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="absolute" />
        </FormItem>
      )}
    />
  );
}

export function CustomFormSelect({ name, control, items, label, placeholder }: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomFormCheckbox({ name, control, label }: CustomFormCheckboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label || name}</FormLabel>
          <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border px-4 py-3 border-input bg-background">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
