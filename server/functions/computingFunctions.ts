function convertPrs(prs: number[]) {
  return prs.map((i) => (i === 1 ? -1 : 1));
}

function autocorrelation(convertedPrs: (1 | -1)[]) {
  const N = convertedPrs.length;
  const result = [];

  for (let delay = 0; delay < N; delay++) {
    let sum = 0;
    for (let i = 0; i < N; i++) {
      sum += convertedPrs[i] * convertedPrs[(i + delay) % N];
    }
    result.push(sum / N);
  }
  result.push(result[0]);
  return result;
}

function linearFeedbackShiftRegister(
  steps: number,
  currentStates: number[],
  structureMatrix: number[][],
) {
  let matrix = [];
  matrix.push(currentStates);

  for (let i = 1; i < steps; i++) {
    let nextStates = [];
    for (let j = 0; j < structureMatrix.length; j++) {
      let row = structureMatrix[j];
      let sum = 0;
      for (let k = 0; k < row.length; k++) {
        sum += row[k] * currentStates[k];
      }
      nextStates.push(sum % 2);
    }

    currentStates = nextStates;
    matrix.push(currentStates);
  }
  return matrix;
}

function getPseudorandomSequence(conditionMatrix: number[][]): number[] {
  return conditionMatrix
    .map((subArray) => subArray[subArray.length - 1])
    .filter((number) => number !== undefined);
}

function hammingWeightCalc(prs: number[]) {
  return prs.filter((item) => item === 1).length;
}

function matrixMultiply(matrixA: number[][], matrixB: number[][]) {
  const n = matrixA.length;
  const m = matrixB[0].length;
  const result: number[][] = [];

  for (let i = 0; i < n; i++) {
    result[i] = [];
    for (let j = 0; j < m; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[i].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }

      result[i][j] = sum % 2;
    }
  }
  return result;
}

function matrixShiftRegister(
  matrixA: number[][],
  matrixB: number[][],
  matrixS: number[][],
  periodS: number,
  outI: number,
  outJ: number,
) {
  let currentState = matrixS;
  let conditionMatrix = [];
  let pseudorandomSequence = [];
  for (let i = 0; i < periodS; i++) {
    currentState = matrixMultiply(matrixA, currentState);
    currentState = matrixMultiply(currentState, matrixB);
    conditionMatrix.push(...currentState);
    pseudorandomSequence.push(currentState[outI][outJ]);
  }

  return { conditionMatrix, pseudorandomSequence };
}

function hammingWeightBlock(prs: number[], blockLength: number) {
  const prsLength = prs.length;
  let weightArray = [];
  for (let i = 0; i < prsLength - blockLength + 1; i++) {
    const blockSlice = prs.slice(i, i + blockLength);
    const blockWeight = hammingWeightCalc(blockSlice);
    weightArray.push(blockWeight);
  }
  return weightArray;
}

function countWeights(weightArray: number[]): Record<string, number> {
  return weightArray.reduce((count: Record<string, number>, num) => {
    count[num] = (count[num] || 0) + 1;
    return count;
  }, {});
}

function performAdditionAndMultiplication(
  prsA: number[],
  prsB: number[],
  periodS: number,
) {
  let sumSequence = [];
  let productSequence = [];
  for (let i = 0; i < periodS; i++) {
    sumSequence[i] = prsA[i] ^ prsB[i];
    productSequence[i] = prsA[i] * prsB[i];
  }
  return { sumSequence, productSequence };
}

function expandSequence(prs: number[], periodS: number) {
  const originalLength = prs.length;
  const repetitions = periodS / originalLength;

  return Array.from({ length: repetitions }, () => [...prs]).flat();
}

export {
  autocorrelation,
  convertPrs,
  linearFeedbackShiftRegister,
  matrixShiftRegister,
  getPseudorandomSequence,
  hammingWeightCalc,
  expandSequence,
  performAdditionAndMultiplication,
  hammingWeightBlock,
  countWeights,
};
