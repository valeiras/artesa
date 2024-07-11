import { UnitType, unitEnum } from "@/lib/types/types";

export const valueToLabel: { [key in UnitType]: string } = {
  unit: "unidades",
  box: "cajas",
  jar: "botes",
  g: "g",
  mg: "mg",
  kg: "kg",
  l: "l",
  dl: "dl",
  cl: "cl",
  ml: "ml",
};

export const availableUnits = unitEnum.options.map((value) => {
  return { value: value, label: valueToLabel[value] };
});
