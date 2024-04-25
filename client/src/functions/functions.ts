import { Polynomial, SortState } from "../utils/interfacesAndTypes.ts";
import { polynomialDestructuring } from "./generatorFunctions.ts";
import { Dispatch, SetStateAction } from "react";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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

export function validityCheck(
  searchParams: URLSearchParams,
  degreeParam: string,
  polynomialParam: string,
  userValueParam: string,
  setError: Dispatch<SetStateAction<string | null>>,
) {
  const degree = parseInt(getSelectedParam(degreeParam, searchParams) || "") ;
  if (degree === undefined || degree === null || isNaN(degree)) {
    setError("Ступінь поліному не обрана.");
    return false;
  }

  const polynomial = getSelectedParam(polynomialParam, searchParams);
  if (polynomial === null) {
    setError("Поліном не обрано або в його написанні є помилка.");
    return false;
  }
  const { polyBinary } = polynomialDestructuring(polynomial);

  if (polyBinary.length - 1 !== degree) {
    setError("Поліном не відповідає обраному ступеню.");
    return false;
  }
  const paramValue = getSelectedParam(userValueParam, searchParams);
  if (paramValue === null) {
    setError("Початкового стану не надано або не було введено.");
    return false;
  }
  console.log(polyBinary.length, paramValue.length);
  if (polyBinary.length !== paramValue.length + 1) {
    setError("Довжина початкового стану не відповідає довжині для бінарного значення цього поліному.");
    return false;
  }
  return true;
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

//SIDEBAR FUNCTIONS
export function formatParameter(parameter: string) {
  return parameter
    .slice(1)
    .replace(/\+/g, " ")
    .replace(/&/g, "; ")
    .replace(/=/g, ": ");
}

export function formatDateTime(dateTimeString: Date) {
  const date = new Date(dateTimeString);
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, ".");
  return `${formattedTime} ${formattedDate}`;
}
