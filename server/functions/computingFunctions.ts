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

function generateStructureMatrixA(
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

function createMatrixInitialArray(
  degree: number,
  polynomial: string[],
): number[] {
  let tmp: number[] = [];
  for (let i = 0; i < degree; i++) {
    tmp.push(Number(polynomial[i]));
  }
  return tmp;
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

function getPrsSequence(conditionMatrix: number[][]): number[] {
  return conditionMatrix
    .map((subArray) => subArray[subArray.length - 1])
    .filter((number) => number !== undefined);
}

function hammingWeightCalc(prsSequence: number[]) {
  return prsSequence.filter((item) => item === 1).length;
}

function transformArrayToObjects(arr: number[]) {
  return arr.map((number, index) => {
    return { index, correlationFirst: number };
  });
}

function experimentalPeriodLengthCalc(
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

export {
  autocorrelation,
  convertPrs,
  generateStructureMatrixA,
  createMatrixInitialArray,
  linearFeedbackShiftRegister,
  getPrsSequence,
  hammingWeightCalc,
  transformArrayToObjects,
  experimentalPeriodLengthCalc
};