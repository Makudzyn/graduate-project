import { BooleanSelect, Polynomial } from "../utils/interfacesAndTypes.ts";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//Replace with array created from fetching
export function generateOptions() {
  return Array.from({ length: 15 }, (_, index) => index + 1);
}

export function getSelectedParam(
  paramName: string,
  searchParams: URLSearchParams,
): string {
  return searchParams.get(paramName) || "0";
}

export function createPlaceholder(polynomial: string): string {
  return "0".repeat(polynomial.length - 2) + "1";
}

export function formatOption(
  optionValue: string | number | Polynomial | BooleanSelect | undefined,
) {
  if (typeof optionValue === "object") {
    if ("name" in optionValue) {
      return optionValue.name + " | " + optionValue.polynomial;
    } else if ("booleanLabel" in optionValue) {
      return optionValue.booleanLabel;
    }
  }
  if (typeof optionValue === 'string' || typeof optionValue === 'number') {
    return String(optionValue);
  }
  return "";
}
