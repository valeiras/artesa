import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type CustomFormCheckboxProps = {
  name: string;
  control: Control<any>;
  label?: string;
};

function CustomFormCheckbox({ name, control, label }: CustomFormCheckboxProps) {
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

export default CustomFormCheckbox;
