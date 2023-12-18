import { $host } from "./index.ts";

export const fetchPolynomials = async () => {
  const { data } = await $host.get("api/polynomials");
  return data;
};

export const sendLinearGeneratorData = async (
  degree: number,
  structureMatrix: number[][],
  userValueArr: number[],
  lengthByFormula: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-linear", {
      degree,
      structureMatrix,
      userValueArr,
      lengthByFormula,
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
  lengthByFormulaS: number,
  indexI: number,
  indexJ: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-matrix", {
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      lengthByFormulaS,
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
