import { $host } from "./index.ts";

export const fetchPolynomials = async () => {
  try {
    const { data } = await $host.get("api/polynomials/get-polynomials");
    const { polynomials, count } = data;
    return { polynomials, count };
  } catch (error) {
    throw new Error("Помилка отримання данних про поліноми з сервера.");
  }
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
      "Помилка відправки данних лінійного генератора для обчислень на сервер.",
    );
  }
};

export const sendMatrixGeneratorData = async (
  structureMatrixA: number[][],
  structureMatrixB: number[][],
  basisMatrix: number[][],
  indexI: number,
  indexJ: number,
  cyclicPeriodLimitation: number | undefined,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute-matrix", {
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      indexI,
      indexJ,
      cyclicPeriodLimitation
    });
    return data;
  } catch (error) {
    throw new Error(
      "Помилка відправки данних матричного генератора для обчислень на сервер.",
    );
  }
};

export const sendSumAndProductGeneratorData = async (
  pseudorandomSequenceA: number[],
  pseudorandomSequenceB: number[],
  periodLengthS: number,
) => {
  try {
    const { data } = await $host.post(
      "api/polynomials/compute-sum-and-product",
      {
        pseudorandomSequenceA,
        pseudorandomSequenceB,
        periodLengthS,
      },
    );
    return data;
  } catch (error) {
    throw new Error(
      "Помилка відправки данних генератора сум та добутків для обчислень на сервер.",
    );
  }
};

export const sendHammingWeightAnalysisData = async (
  linearSequence: number[],
  matrixSequence: number[],
  hammingBlockLength: number,
) => {
  try {
    const { data } = await $host.post(
      "api/polynomials/compute-hamming-weight-block",
      {
        linearSequence,
        matrixSequence,
        hammingBlockLength,
      },
    );
    return data;
  } catch (error) {
    throw new Error("Помилка відправки данних ваг Хеммінгу для обчислень на сервер.");
  }
};
