import {
  sendHammingWeightAnalysisData,
  sendLinearGeneratorData,
  sendMatrixGeneratorData,
  sendSumAndProductGeneratorData,
} from "../http/polynomialsAPI.ts";
import { Dispatch, SetStateAction } from "react";

import {
  calcHammingWeightSpectre,
  calcLengthByFormula,
  createMatrixInitialArray,
  findGCD,
  formatHammingWeight,
  generateCyclicPolynomial,
  generateMatrixBasis,
  generateStructureMatrixA,
  generateStructureMatrixB,
  polynomialDestructuring,
} from "./generatorFunctions.ts";
import { getSelectedParam } from "./functions.ts";

export async function linearCalculations(
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
  setCorrelation?: Dispatch<SetStateAction<number[]>>,
) {
  const degree = Number(getSelectedParam(degreeParam, searchParams) || "2");
  const polynomial = getSelectedParam(polynomialParam, searchParams) || "1 7 H";
  const userValue = getSelectedParam(userValueParam, searchParams) || "11";

  const { polyIndex, polyBinary } = polynomialDestructuring(polynomial);
  const polynomialArr = polyBinary.split("").slice(1);

  const userValueArr = userValue.split("").map(Number);

  const potentialLength = Math.pow(2, degree) - 1;
  setPotentialPeriodLength(potentialLength);

  const factualLength = calcLengthByFormula(degree, polyIndex);
  setFactualPeriodLength(factualLength);

  const structureMatrix = generateStructureMatrixA(
    degree,
    createMatrixInitialArray(degree, polynomialArr),
  );
  setStructureMatrix(structureMatrix);


  try {
    const {
      conditionMatrix,
      pseudorandomSequence,
      hammingWeight,
      correlation,
    } = await sendLinearGeneratorData(
      structureMatrix,
      userValueArr,
      factualLength,
    );
    setConditionMatrix(conditionMatrix);
    setPseudorandomSequence(pseudorandomSequence);
    setHammingWeight(hammingWeight);
    setCorrelation && setCorrelation(correlation);
  } catch (error: any) {
    console.error("Error sending data to server:", error.message);
  }
}

export async function matrixCalculations(
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
  setStructureMatrixA: Dispatch<SetStateAction<number[][]>>,
  setStructureMatrixB: Dispatch<SetStateAction<number[][]>>,
  setConditionMatrix: Dispatch<SetStateAction<number[][]>>,
  setBasisMatrix: Dispatch<SetStateAction<number[][]>>,
  setPotentialPeriodLengthA: Dispatch<SetStateAction<number>>,
  setPotentialPeriodLengthB: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthA: Dispatch<SetStateAction<number>>,
  setFactualPeriodLengthB: Dispatch<SetStateAction<number>>,
  setPeriodLengthS: Dispatch<SetStateAction<number>>,
  setConditionS: Dispatch<SetStateAction<number>>,
  setPseudorandomSequence: Dispatch<SetStateAction<number[]>>,
  setHammingWeight: Dispatch<SetStateAction<number>>,
  setHammingWeightSpectre: Dispatch<SetStateAction<string[]>>,
  setCorrelation?: Dispatch<SetStateAction<number[]>>,
) {
  const degreeA = Number(getSelectedParam(degreeParamA, searchParams) || "2");
  const polynomialA =
    getSelectedParam(polynomialParamA, searchParams) || "1 7 H";
  const isCyclicA = getSelectedParam(cyclicPolyParamA, searchParams) || "false";

  const degreeB = Number(getSelectedParam(degreeParamB, searchParams) || "2");
  const polynomialB =
    getSelectedParam(polynomialParamB, searchParams) || "1 7 H";
  const isCyclicB = getSelectedParam(cyclicPolyParamB, searchParams) || "false";

  const indexI = Number(getSelectedParam(indexParamI, searchParams) || "0");
  const indexJ = Number(getSelectedParam(indexParamJ, searchParams) || "0");
  const matrixRank = Number(
    getSelectedParam(matrixRankParam, searchParams) || "1",
  );

  const { polyIndex: polyIndexA, polyBinary: polyBinaryA } =
    polynomialDestructuring(polynomialA);
  const { polyIndex: polyIndexB, polyBinary: polyBinaryB } =
    polynomialDestructuring(polynomialB);

  let polynomialArrA, polynomialArrB;

  if (isCyclicA === "true") {
    polynomialArrA = generateCyclicPolynomial(degreeA);
  } else polynomialArrA = polyBinaryA.split("").slice(1);

  if (isCyclicB === "true") {
    polynomialArrB = generateCyclicPolynomial(degreeB);
  } else polynomialArrB = polyBinaryB.split("").slice(1);

  const potentialPeriodLengthA = Math.pow(2, degreeA) - 1;
  const potentialPeriodLengthB = Math.pow(2, degreeB) - 1;

  setPotentialPeriodLengthA(potentialPeriodLengthA);
  setPotentialPeriodLengthB(potentialPeriodLengthB);

  const periodLengthA = calcLengthByFormula(degreeA, polyIndexA);
  const periodLengthB = calcLengthByFormula(degreeB, polyIndexB);
  const periodLengthS = periodLengthA * periodLengthB;

  setFactualPeriodLengthA(periodLengthA);
  setFactualPeriodLengthB(periodLengthB);
  setPeriodLengthS(periodLengthS);

  const structureMatrixA = generateStructureMatrixA(
    degreeA,
    createMatrixInitialArray(degreeA, polynomialArrA),
  );

  const structureMatrixB = generateStructureMatrixB(
    degreeB,
    createMatrixInitialArray(degreeB, polynomialArrB),
  );

  const basisMatrix = generateMatrixBasis(degreeA, degreeB, matrixRank);

  setStructureMatrixA(structureMatrixA);
  setStructureMatrixB(structureMatrixB);
  setBasisMatrix(basisMatrix);

  const condition = findGCD(periodLengthA, periodLengthB);
  setConditionS(condition);

  const hammingWeightSpectre = calcHammingWeightSpectre(
    matrixRank,
    degreeA,
    degreeB,
  );
  const formattedWeightSpectre = formatHammingWeight(hammingWeightSpectre);
  setHammingWeightSpectre(formattedWeightSpectre);

  try {
    const {
      conditionMatrix,
      pseudorandomSequence,
      hammingWeight,
      correlation,
    } = await sendMatrixGeneratorData(
      structureMatrixA,
      structureMatrixB,
      basisMatrix,
      periodLengthS,
      indexI,
      indexJ,
    );
    setConditionMatrix(conditionMatrix);
    setPseudorandomSequence(pseudorandomSequence);
    setHammingWeight(hammingWeight);
    setCorrelation && setCorrelation(correlation);
  } catch (error: any) {
    console.error("Error sending data to server:", error.message);
  }
}

export async function additionAndMultiplicationCalculations(
  pseudorandomSequenceA: number[],
  pseudorandomSequenceB: number[],
  periodLengthS: number,
  setSumSequence: Dispatch<SetStateAction<number[]>>,
  setProductSequence: Dispatch<SetStateAction<number[]>>,
  setHammingWeightSum: Dispatch<SetStateAction<number>>,
  setHammingWeightProduct: Dispatch<SetStateAction<number>>,
  setSumCorrelation: Dispatch<SetStateAction<number[]>>,
  setProductCorrelation: Dispatch<SetStateAction<number[]>>,
) {
  try {
    const {
      sumSequence,
      productSequence,
      hammingWeightSum,
      hammingWeightProduct,
      sumCorrelation,
      productCorrelation,
    } = await sendSumAndProductGeneratorData(
      pseudorandomSequenceA,
      pseudorandomSequenceB,
      periodLengthS,
    );
    setSumSequence(sumSequence);
    setProductSequence(productSequence);
    setHammingWeightSum(hammingWeightSum);
    setHammingWeightProduct(hammingWeightProduct);
    setSumCorrelation(sumCorrelation);
    setProductCorrelation(productCorrelation);
  } catch (error: any) {
    console.error("Error sending data to server:", error.message);
  }
}

export async function hammingBlockCalculations(
  searchParams: URLSearchParams,
  hammingBlockParam: string,
  linearSequence: number[],
  matrixSequence: number[],
  setLinearSeqBlockLengths: Dispatch<SetStateAction<number[]>>,
  setMatrixSeqBlockLengths: Dispatch<SetStateAction<number[]>>,
  setSharedWeights: Dispatch<SetStateAction<number[]>>,
) {
  const hammingBlockLength = Number(
    getSelectedParam(hammingBlockParam, searchParams) || "2",
  );
  try {
    const { linearWeights, matrixWeights, sharedWeights } =
      await sendHammingWeightAnalysisData(
        linearSequence,
        matrixSequence,
        hammingBlockLength,
      );
    setLinearSeqBlockLengths(linearWeights);
    setMatrixSeqBlockLengths(matrixWeights);
    setSharedWeights(sharedWeights);
  } catch (error: any) {
    console.error("Error sending data to server:", error.message);
  }
}
