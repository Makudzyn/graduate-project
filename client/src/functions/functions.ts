import { Polynomial, PolynomialType, SortState } from "../utils/interfacesAndTypes.ts";
import { inputsValidityCheckLinear, inputsValidityCheckMatrix } from "./validationFunctions.ts";
import { linearCalculations, matrixCalculations } from "./requestFunctions/calculationRequestFunctions.ts";
import { Dispatch, SetStateAction } from "react";;

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

//Handling generation click
export const linearValidationBeforeCalculations = (
  searchParams: URLSearchParams,
  PARAMS_DEGREE: string, PARAMS_POLYNOMIAL: string, PARAMS_USER_VALUE: string,
  setStructureMatrix: Dispatch<SetStateAction<number[][]>>,
  setConditionMatrix: Dispatch<SetStateAction<number[][]>>,
  setPotentialPeriodLength: Dispatch<SetStateAction<number>>,
  setFactualPeriodLength: Dispatch<SetStateAction<number>>,
  setPseudorandomSequence: Dispatch<SetStateAction<number[]>>,
  setHammingWeight: Dispatch<SetStateAction<number>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setCorrelation?: Dispatch<SetStateAction<number[]>>,
  polynomialType?: PolynomialType,
) => {
  let calculated = false;
  const isValid = inputsValidityCheckLinear(searchParams, PARAMS_DEGREE, PARAMS_POLYNOMIAL, PARAMS_USER_VALUE, setError, polynomialType);
  if (isValid) {
    linearCalculations(
      searchParams,
      PARAMS_DEGREE, PARAMS_POLYNOMIAL, PARAMS_USER_VALUE,
      setStructureMatrix, setConditionMatrix,
      setPotentialPeriodLength, setFactualPeriodLength,
      setPseudorandomSequence,
      setHammingWeight,
      setLoading, setError,
      setCorrelation,
    )
      .then(() => calculated = true);
  }
  return calculated;
};

export const matrixValidationBeforeCalculations = (
  searchParams: URLSearchParams,
  PARAMS_DEGREE_A: string, PARAMS_DEGREE_B: string,
  PARAMS_POLYNOMIAL_A: string, PARAMS_POLYNOMIAL_B: string,
  PARAMS_CYCLIC_POLY_A: string, PARAMS_CYCLIC_POLY_B: string,
  PARAMS_OUTPUT_INDEX_I: string, PARAMS_OUTPUT_INDEX_J: string, PARAMS_MATRIX_RANK: string,
  setStructureMatrixA: Dispatch<SetStateAction<number[][]>>,
  setStructureMatrixB: Dispatch<SetStateAction<number[][]>>,
  setConditionMatrix: Dispatch<SetStateAction<number[][]>>,
  setBasisMatrix: Dispatch<SetStateAction<number[][]>>,
  setPotentialPeriodLengthA: Dispatch<SetStateAction<number>>,
  setPotentialPeriodLengthB: Dispatch<SetStateAction<number>>,
  setPotentialPeriodLengthS: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthA: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthB: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthS: Dispatch<SetStateAction<number>>,
  setConditionS: Dispatch<SetStateAction<number>>,
  setPseudorandomSequence: Dispatch<SetStateAction<number[]>>,
  setHammingWeight: Dispatch<SetStateAction<number>>,
  setHammingWeightSpectre: Dispatch<SetStateAction<string[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setCorrelation?: Dispatch<SetStateAction<number[]>>,
) => {
  let calculated = false;
  const isValid =
    inputsValidityCheckMatrix(
      searchParams,
      PARAMS_DEGREE_A, PARAMS_DEGREE_B,
      PARAMS_POLYNOMIAL_A, PARAMS_POLYNOMIAL_B,
      PARAMS_CYCLIC_POLY_A, PARAMS_CYCLIC_POLY_B,
      PARAMS_OUTPUT_INDEX_I, PARAMS_OUTPUT_INDEX_J, PARAMS_MATRIX_RANK,
      setError
    );
  if (isValid) {
    matrixCalculations(
      searchParams,
      PARAMS_DEGREE_A, PARAMS_DEGREE_B,
      PARAMS_POLYNOMIAL_A, PARAMS_POLYNOMIAL_B,
      PARAMS_CYCLIC_POLY_A, PARAMS_CYCLIC_POLY_B,
      PARAMS_OUTPUT_INDEX_I, PARAMS_OUTPUT_INDEX_J, PARAMS_MATRIX_RANK,
      setStructureMatrixA, setStructureMatrixB,
      setConditionMatrix, setBasisMatrix,
      setPotentialPeriodLengthA, setPotentialPeriodLengthB, setFactualPeriodLengthS,
      setFactualPeriodLengthA, setFactualPeriodLengthB, setPotentialPeriodLengthS,
      setConditionS,
      setPseudorandomSequence,
      setHammingWeight, setHammingWeightSpectre,
      setLoading, setError,
      setCorrelation,
    ).then(() => calculated = true);
  }
  return calculated;
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
