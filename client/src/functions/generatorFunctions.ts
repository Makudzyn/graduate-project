export function polynomialDestructuring(poly: string) {
  const parts = poly.split(" ");

  const polyIndex = parseInt(parts[0]);
  const polyBinary = parseInt(parts[1], 8).toString(2);
  const polyLetter = parts[2];

  return { polyIndex, polyBinary, polyLetter };
}
export function createMatrixInitialArray(
  degree: number,
  polynomial: string[],
): number[] {
  let tmp: number[] = [];
  for (let i = 0; i < degree; i++) {
    tmp.push(Number(polynomial[i]));
  }
  return tmp;
}

export function generateStructureMatrixA(
  degree: number,
  structureRow: number[],
): number[][] {
  let structureMatrix: number[][] = [];
  structureMatrix[0] = structureRow;
  for (let i = 1; i < degree; i++) {
    structureMatrix[i] = [];
    for (let j = 0; j < degree; j++) {
      structureMatrix[i][j] = i === j + 1 ? 1 : 0;
    }
  }
  return structureMatrix;
}

export function generateStructureMatrixB(
  degree: number,
  structureColumn: number[],
) {
  let structureMatrix: number[][] = [];
  for (let i = 0; i < degree; i++) {
    structureMatrix[i] = [];
    for (let j = 0; j < degree; j++) {
      if (j === 0) {
        structureMatrix[i][j] = structureColumn[i];
      } else if (j === i + 1) {
        structureMatrix[i][j] = 1;
      } else {
        structureMatrix[i][j] = 0;
      }
    }
  }
  return structureMatrix;
}

export function generateMatrixBasis(n: number, m: number, rank: number) {
  const state: number[][] = [];
  for (let i = 0; i < n; i++) {
    state[i] = [];
    for (let j = 0; j < m; j++) {
      state[i][j] = i === j && i < rank && j < rank ? 1 : 0;
    }
  }
  return state;
}

export function linearFeedbackShiftRegister(
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
export function findGCD(potentialLength: number, polynomialIndex: number) {
  let a = potentialLength;
  let b = polynomialIndex;
  while (b !== 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}
export function calcLengthByFormula(
  degree: number,
  polynomialIndex: number,
): number {
  const potentialLength = Math.pow(2, degree) - 1;
  return potentialLength / findGCD(potentialLength, polynomialIndex);
}
export function experimentalPeriodLengthCalc(
  degree: number,
  structureMatrix: number[][],
): number {
  let periodExp = 0;
  let startState = [];
  for (let i = 0; i < degree; i++) {
    startState[i] = 1;
  }
  let currentState = startState.slice();
  while (periodExp === 0 || currentState.join("") !== startState.join("")) {
    let nextState = [];
    for (let i = 0; i < degree; i++) {
      nextState[i] = 0;
      for (let j = 0; j < degree; j++) {
        nextState[i] = nextState[i] ^ (currentState[j] * structureMatrix[i][j]);
      }
    }
    currentState = nextState.slice();
    periodExp++;
  }
  return periodExp;
}

export function getPrsSequence(conditionMatrix: number[][]): number[] {
  return conditionMatrix
    .map((subArray) => subArray[subArray.length - 1])
    .filter((number) => number !== undefined);
}

export function hammingWeightCalc(prsSequence: number[]) {
  return prsSequence.filter((item) => item === 1).length;
}

export function convertPrs(prs: number[]) {
  return prs.map((i) => (i === 1 ? -1 : 1));
}

export function autocorrelation(convertedPrs: (1 | -1)[]) {
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

export function transformArrayToObjects(arr: number[]) {
  return arr.map((number, index) => {
    return { index, correlationFirst: number };
  });
}

export function calculatePossibleValues(degree: number) {
  return Array.from({ length: degree }, (_, index) => index);
}
