import {PARAMS_USER_VALUE} from "../utils/consts.ts";


export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//Replace with array created from fetching
export function generateOptions() {
  return Array.from({ length: 15 }, (_, index) => index + 1);
}

export function getSelectedDegree(paramName : string, searchParams: URLSearchParams): string {
  return searchParams.get(paramName) || "2";
}

export function getSelectedPolynomial(paramName : string, searchParams: URLSearchParams): string {
  return searchParams.get(paramName) || "1 7 H";
}

export function getUserValue(searchParams: URLSearchParams): string {
  return searchParams.get(PARAMS_USER_VALUE) || "11";
}

export function createPlaceholder(polynomial: string): string {
  return "0".repeat(polynomial.length - 2) + "1";
}

