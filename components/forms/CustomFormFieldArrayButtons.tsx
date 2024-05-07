import { ArrayPath, FieldArray, FieldValues, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function AddButtonFieldArray<T extends FieldValues>({
  append,
  emptyValue,
}: {
  append: UseFieldArrayAppend<T, ArrayPath<T>>;
  emptyValue: FieldArray<T, ArrayPath<T>> | undefined;
}) {
  return (
    <Button
      type="button"
      onClick={() => {
        if (emptyValue) append(emptyValue);
      }}
    >
      <Plus strokeWidth={2.0} size={18} />
    </Button>
  );
}

export function RemoveButtonFieldArray({ remove, index }: { remove: UseFieldArrayRemove; index: number }) {
  return (
    <Button
      variant="destructive"
      type="button"
      onClick={() => {
        remove(index);
      }}
    >
      <Trash2 strokeWidth={2.0} size={18} />
    </Button>
  );
}
