import { BooleanSelect, Polynomial, SortState } from "../utils/interfacesAndTypes.ts";

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
) {
  return searchParams.get(paramName);
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


//TABLE FUNCTIONS

//Compare values of two polynomials using sortObj with column (your cols) and order (asc, desc) fields which
export function compareValues(sortObj: SortState, polyA: Polynomial, polyB: Polynomial): number {
  if (typeof polyA[sortObj.column] === "string" && sortObj.column !== "polynomial") {
    return sortObj.order === "ascending"
      ? (polyA[sortObj.column] as string).localeCompare(polyB[sortObj.column] as string)
      : (polyB[sortObj.column] as string).localeCompare(polyA[sortObj.column] as string);
  } else {
    return sortObj.order === "ascending"
      ? (polyA[sortObj.column] as number) - (polyB[sortObj.column] as number)
      : (polyB[sortObj.column] as number) - (polyA[sortObj.column] as number);
  }
}
//Looking for value of query in polynomials field: degree, name, polynomials
export function filterByQuery(poly: Polynomial, query: string): boolean {
  const searchFields = ["degree", "name", "polynomial"];
  const lowercaseQuery = query.toLowerCase();

  return searchFields.some((field) =>
    // @ts-ignore
    String(poly[field]).toLowerCase().includes(lowercaseQuery),
  );
}
