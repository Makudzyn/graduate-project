import {
  Polynomial,
  PolynomialType,
  SortState,
} from "../utils/interfacesAndTypes.ts";
import {
  inputsValidityCheckFrobenius,
  inputsValidityCheckLinear,
  inputsValidityCheckMatrix,
} from "./validationFunctions.ts";
import {
  frobeniusCalculations,
  linearCalculations,
  matrixCalculations,
} from "./requestFunctions/calculationRequestFunctions.ts";
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

//Handling generation click
export const linearValidationBeforeCalculations = (
  searchParams: URLSearchParams,
  degreeParam: string,
  polynomialParam: string,
  userValueParam: string,
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
  const isValid = inputsValidityCheckLinear(
    searchParams,
    degreeParam,
    polynomialParam,
    userValueParam,
    setError,
    polynomialType,
  );
  if (isValid) {
    linearCalculations(
      searchParams,
      degreeParam,
      polynomialParam,
      userValueParam,
      setStructureMatrix,
      setConditionMatrix,
      setPotentialPeriodLength,
      setFactualPeriodLength,
      setPseudorandomSequence,
      setHammingWeight,
      setLoading,
      setError,
      setCorrelation,
    )
    return true;
  }
  return false;
};

export const matrixValidationBeforeCalculations = (
  searchParams: URLSearchParams,
  degreeParamA: string,
  degreeParamB: string,
  polynomialParamA: string,
  polynomialParamB: string,
  cyclicParamA: string,
  cyclicParamB: string,
  outputIndexParamI: string,
  outputIndexParamJ: string,
  matrixRankParam: string,
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
  const isValid = inputsValidityCheckMatrix(
    searchParams,
    degreeParamA,
    degreeParamB,
    polynomialParamA,
    polynomialParamB,
    cyclicParamA,
    cyclicParamB,
    outputIndexParamI,
    outputIndexParamJ,
    matrixRankParam,
    setError,
  );
  if (isValid) {
    matrixCalculations(
      searchParams,
      degreeParamA,
      degreeParamB,
      polynomialParamA,
      polynomialParamB,
      cyclicParamA,
      cyclicParamB,
      outputIndexParamI,
      outputIndexParamJ,
      matrixRankParam,
      setStructureMatrixA,
      setStructureMatrixB,
      setConditionMatrix,
      setBasisMatrix,
      setPotentialPeriodLengthA,
      setPotentialPeriodLengthB,
      setFactualPeriodLengthS,
      setFactualPeriodLengthA,
      setFactualPeriodLengthB,
      setPotentialPeriodLengthS,
      setConditionS,
      setPseudorandomSequence,
      setHammingWeight,
      setHammingWeightSpectre,
      setLoading,
      setError,
      setCorrelation,
    );
    return true;
  }
  return false;
};

export const frobeniusValidationBeforeCalculations = (
  searchParams: URLSearchParams,
  degreeParam: string,
  polynomialParam: string,
  userValueParam: string,
  decomposedPolyParam: string,
  outputIndexParamI: string,
  outputIndexParamJ: string,
  setStructureMatrixA: Dispatch<SetStateAction<number[][]>>,
  setStructureMatrixB: Dispatch<SetStateAction<number[][]>>,
  setConditionMatrix: Dispatch<SetStateAction<number[][]>>,
  setBasisMatrix: Dispatch<SetStateAction<number[][]>>,
  setPotentialPeriodLength: Dispatch<SetStateAction<number>>,
  setPotentialPeriodLengthS: Dispatch<SetStateAction<number>>,
  setFactualPeriodLength: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthS: Dispatch<SetStateAction<number>>,
  setPseudorandomSequence: Dispatch<SetStateAction<number[]>>,
  setHammingWeight: Dispatch<SetStateAction<number>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setCorrelation: Dispatch<SetStateAction<number[]>>,
) => {
  const isValid = inputsValidityCheckFrobenius(
    searchParams,
    degreeParam,
    polynomialParam,
    userValueParam,
    decomposedPolyParam,
    outputIndexParamI,
    outputIndexParamJ,
    setError,
  );
  if (isValid) {
    frobeniusCalculations(
      searchParams,
      degreeParam,
      polynomialParam,
      userValueParam,
      decomposedPolyParam,
      outputIndexParamI,
      outputIndexParamJ,
      setStructureMatrixA,
      setStructureMatrixB,
      setConditionMatrix,
      setBasisMatrix,
      setPotentialPeriodLength,
      setPotentialPeriodLengthS,
      setFactualPeriodLength,
      setFactualPeriodLengthS,
      setPseudorandomSequence,
      setHammingWeight,
      setLoading,
      setError,
      setCorrelation,
    );
    return true;
  }
  return false;
};

//TABLE FUNCTIONS

//Compare values of two polynomials using sortObj with column (your cols) and order (asc, desc) fields which
export function compareValues(
  sortObj: SortState,
  polyA: Polynomial,
  polyB: Polynomial,
): number {
  if (
    typeof polyA[sortObj.column] === "string" &&
    sortObj.column !== "polynomial"
  ) {
    return sortObj.order === "ascending"
      ? (polyA[sortObj.column] as string).localeCompare(
          polyB[sortObj.column] as string,
        )
      : (polyB[sortObj.column] as string).localeCompare(
          polyA[sortObj.column] as string,
        );
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
