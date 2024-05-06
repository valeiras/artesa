import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvailableArray(dbData: { name: string; id: number }[] | undefined | null, prefix: string = "") {
  return (
    dbData?.map(({ name, id }) => {
      return { value: `${prefix}${id.toString()}`, label: name };
    }) || []
  );
}
