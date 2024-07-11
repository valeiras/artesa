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

export function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toLocaleDateString() === d2.toLocaleDateString();
}

export function isPreviousDay(d1: Date, d2: Date): boolean {
  return new Date(d1).setHours(0, 0, 0, 0) <= new Date(d2).setHours(0, 0, 0, 0);
}
