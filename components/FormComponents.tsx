import { Control } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute, useState } from "react";

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
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

type CustomFormDatePickerProps = {
  name: string;
  control: Control<any>;
  label?: string;
};

export function CustomFormField({ name, control, label, placeholder, disabled, type }: CustomFormFieldProps) {
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

export function CustomFormSelect({ name, control, items, label, placeholder }: CustomFormSelectProps) {
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

export function CustomFormCheckbox({ name, control, label }: CustomFormCheckboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col h-full justify-between pt-1 relative">
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

export function CustomFormDatePicker({ name, control, label }: CustomFormDatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col h-full justify-between pt-1 relative">
          <FormLabel>{label}</FormLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                >
                  {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(e) => {
                  field.onChange(e);
                  setIsCalendarOpen(false);
                }}
                disabled={(date) => date > new Date("2100-01-01") || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="absolute -bottom-6" />
        </FormItem>
      )}
    />
  );
}
