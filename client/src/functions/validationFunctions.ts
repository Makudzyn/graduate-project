import { Dispatch, SetStateAction } from "react";
import { polynomialDestructuring } from "./generatorFunctions.ts";
import { getSelectedParam } from "./functions.ts";

function degreeValidity(degree: number): boolean {
  return degree === undefined || degree === null || isNaN(degree);
}

function polynomialValidity(polynomial: string | null): boolean {
  return polynomial === null;
}

function polynomialAccordanceValidity(degree: number, polyBinary: string): boolean {
  return polyBinary.length - 1 !== degree;
}



export function inputsValidityCheckLinear(
  searchParams: URLSearchParams,
  degreeParam: string,
  polynomialParam: string,
  userValueParam: string,
  setError: Dispatch<SetStateAction<string | null>>,
) {
  const degree = parseInt(getSelectedParam(degreeParam, searchParams) || "");
  if (degreeValidity(degree)) {
    setError("Ступінь поліному не обрано або в його значенні є помилка.");
    return false;
  }

  const polynomial = getSelectedParam(polynomialParam, searchParams);
  if (polynomialValidity(polynomial)) {
    setError("Поліном не обрано або в його написанні є помилка.");
    return false;
  }

  // @ts-ignore
  const { polyBinary } = polynomialDestructuring(polynomial); //We're checking if it`s null in previous function but TS don`t see it
  if (polynomialAccordanceValidity(degree, polyBinary)) {
    setError("Поліном не відповідає обраному ступеню.");
    return false;
  }

  const userValue = getSelectedParam(userValueParam, searchParams);
  if (userValue === null) {
    setError("Початкового стану не надано або не було введено.");
    return false;
  }

  if (polyBinary.length !== userValue.length + 1) {
    setError("Довжина початкового стану не відповідає довжині для бінарного значення цього поліному.");
    return false;
  }
  return true;
}

export function inputsValidityCheckMatrix(
  searchParams: URLSearchParams,
  degreeParamA: string,
  degreeParamB: string,
  polynomialParamA: string,
  polynomialParamB: string,
  cyclicPolyParamA: string,
  cyclicPolyParamB: string,
  indexParamI: string,
  indexParamJ: string,
  matrixRankParam: string,
  setError: Dispatch<SetStateAction<string | null>>,
) {
  const degreeA = parseInt(getSelectedParam(degreeParamA, searchParams) || "");
  if (degreeValidity(degreeA)) {
    setError("Ступінь поліному для матриці A не обрано або в його значенні є помилка.");
    return false;
  }

  const polynomialA = getSelectedParam(polynomialParamA, searchParams);
  if (polynomialValidity(polynomialA)) {
    setError("Поліном матриці A не обрано або в його написанні є помилка.");
    return false;
  }

  // @ts-ignore
  const { polyBinary: polyBinaryA } = polynomialDestructuring(polynomialA); //We're checking if it`s null in previous function but TS don`t see it
  if (polynomialAccordanceValidity(degreeA, polyBinaryA)) {
    setError("Поліном матриці A не відповідає обраному ступеню.");
    return false;
  }

  const cyclicA = getSelectedParam(cyclicPolyParamA, searchParams);
  if (cyclicA !== null && (cyclicA !== "false" && cyclicA !== "true")) {
    setError("Некоректне значення циклічного полінома для матриці A.")
    return false;
  }

  const degreeB = parseInt(getSelectedParam(degreeParamB, searchParams) || "");
  if (degreeValidity(degreeB)) {
    setError("Ступінь поліному для матриці B не обрано або в його значенні є помилка.");
    return false;
  }

  const polynomialB = getSelectedParam(polynomialParamB, searchParams);
  if (polynomialValidity(polynomialB)) {
    setError("Поліном матриці B не обрано або в його написанні є помилка.");
    return false;
  }

  // @ts-ignore
  const { polyBinary: polyBinaryB } = polynomialDestructuring(polynomialB); //We're checking if it`s null in previous function but TS don`t see it
  if (polynomialAccordanceValidity(degreeB, polyBinaryB)) {
    setError("Поліном матриці B не відповідає обраному ступеню.");
    return false;
  }

  const cyclicB = getSelectedParam(cyclicPolyParamB, searchParams);
  if (cyclicB !== null && (cyclicB !== "false" && cyclicB !== "true")) {
    setError("Некоректне значення циклічного полінома для матриці B.")
    return false;
  }

  const indexI = parseInt(getSelectedParam(indexParamI, searchParams) || "");
  if (indexI !== null && (indexI >= degreeA || indexI < 0)) {
    setError("Некоректне значення індексу вихідного елемента I.")
    return false;
  }

  const indexJ = parseInt(getSelectedParam(indexParamJ, searchParams) || "");
  if (indexJ !== null && (indexJ >= degreeB || indexJ < 0)) {
    setError("Некоректне значення індексу вихідного елемента J.")
    return false;
  }

  const matrixRank = parseInt(getSelectedParam(matrixRankParam, searchParams) || "");
  if (matrixRank !== null && (matrixRank > Math.min(degreeA, degreeB) || matrixRank <= 0)) {
    setError("Некоректне значення рангу матриці.")
    return false;
  }

  return true;
}