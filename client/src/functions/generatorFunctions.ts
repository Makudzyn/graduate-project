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
  structureMatrix: number[][],
  degreeA: number,
): number {
  let periodExp = 0;
  const startState = Array(degreeA).fill(1); // Используем Array.fill() для инициализации массива startState

  let currentState = [...startState]; // Копируем startState с помощью spread оператора

  const startStateString = startState.join(""); // Предварительно объединяем startState в строку для удобства сравнения

  while (periodExp === 0 || currentState.join("") !== startStateString) {
    const nextState = Array(degreeA).fill(0); // Используем Array.fill() для инициализации массива nextState

    for (let i = 0; i < degreeA; i++) {
      for (let j = 0; j < degreeA; j++) {
        nextState[i] ^= currentState[j] * structureMatrix[i][j]; // Используем оператор ^= для XOR
      }
    }

    currentState = [...nextState]; // Обновляем currentState с помощью копирования nextState

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

export function calcHammingWeightSpectre(
  rankS: number,
  degreeA: number,
  degreeB: number,
) {
  let result = [];
  for (let i = 1; i <= rankS; i++) {
    let tmp = (Math.pow(2, i) - 1) * Math.pow(2, degreeA + degreeB - 1 - i);
    result.push(tmp);
  }
  return result;
}

export function formatHammingWeight(weightSpectre: number[]) {
  let textHammingWeight = [];
  for (let i = 0; i < weightSpectre.length; i++) {
    textHammingWeight.push(` wt(C(${i + 1})) = ${weightSpectre[i]}`);
  }
  return textHammingWeight;
}


export function transformArrayToObjects(arr: number[]) {
  return arr.map((number, index) => {
    return { index, correlationFirst: number };
  });
}

export function calculatePossibleValues(degree: number, start: number = 0) {
  return Array.from({ length: degree }, (_, index) => index + start);
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

export function matrixShiftRegister(
  matrixA: number[][],
  matrixB: number[][],
  matrixS: number[][],
  periodS: number,
  outI: number,
  outJ: number,
) {
  let currentState = matrixS;
  let conditionMatrix = [];
  let generatedPrs = [];
  for (let i = 0; i < periodS; i++) {
    currentState = matrixMultiply(matrixA, currentState);
    currentState = matrixMultiply(currentState, matrixB);
    conditionMatrix.push(...currentState);
    generatedPrs.push(currentState[outI][outJ]);
  }

  return { conditionMatrix, generatedPrs };
}
