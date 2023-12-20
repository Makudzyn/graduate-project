import { $host } from "./index.ts";

export const fetchPolynomials = async () => {
  const { data } = await $host.get("api/polynomials");
  return data;
};

export const sendLinearGeneratorData = async (
  structureMatrix: number[][],
  userValueArr: number[],
  factualLength: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-linear", {
      structureMatrix,
      userValueArr,
      factualLength,
    });
    return data;
  } catch (error) {
    throw new Error(
      "Error sending linear generator data for computation on server.",
    );
  }
};

export const sendMatrixGeneratorData = async (
  structureMatrixA: number[][],
  structureMatrixB: number[][],
  basisMatrix: number[][],
  periodLengthS: number,
  indexI: number,
  indexJ: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-matrix", {
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      periodLengthS,
      indexI,
      indexJ,
    });
    return data;
  } catch (error) {
    throw new Error(
      "Error sending matrix generator data for computation on server.",
    );
  }
};

export const sendSumAndMultiplicationGeneratorData = async (
  structureMatrixA: number[][],
  structureMatrixB: number[][],
  userValueArrA: number[],
  userValueArrB: number[],
  factualLengthA: number,
  factualLengthB: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-sum-and-multiplication", {
      structureMatrixA,
      structureMatrixB,
      userValueArrA,
      userValueArrB,
      factualLengthA,
      factualLengthB,
    });
    return data;
  } catch (error) {
    throw new Error(
      "Error sending sum and multiplication generator data for computation on server.",
    );
  }
};
