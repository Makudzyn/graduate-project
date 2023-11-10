export function polynomialDestructuring(poly: string) {
  const parts = poly.split(" ");

  const polyIndex = parseInt(parts[0]);
  const polyBinary = parseInt(parts[1], 8).toString(2);
  const polyLetter = parts[2];

  return { polyIndex, polyBinary, polyLetter };
}
export function createMatrixRow(
  degree: number,
  polynomial: string[],
): number[] {
  let tmp: number[] = [];
  for (let i = 0; i < degree; i++) {
    tmp.push(Number(polynomial[i]));
  }
  return tmp;
}

export function createMatrix(
  degree: number,
  structureRow: number[],
): number[][] {
  let matrix: number[][] = [];
  matrix[0] = structureRow;
  for (let i = 1; i < degree; i++) {
    matrix[i] = [];
    for (let j = 0; j < degree; j++) {
      matrix[i][j] = i === j + 1 ? 1 : 0;
    }
  }
  return matrix;
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

export function correlationNameAndType(corrValue: number) {
  let correlationType = "Пряма залежність";
  let correlationName = "";

  if (corrValue < 0) {
    correlationType = "Обернена залежність";
  }

  if (corrValue === 0) {
    correlationName = "Кореляція відсутня";
  } else if (corrValue < 0.1) {
    correlationName = "Кореляція майже відсутня";
  } else if (corrValue < 0.3) {
    correlationName = "Слабка кореляція";
  } else if (corrValue < 0.5) {
    correlationName = "Помірна кореляція";
  } else if (corrValue < 0.7) {
    correlationName = "Помітна кореляція";
  } else if (corrValue < 0.9) {
    correlationName = "Сильна кореляція";
  } else if (corrValue < 0.99) {
    correlationName = "Дуже сильна кореляція";
  } else if (corrValue < 1) {
    correlationName = "Майже функціональна кореляція";
  } else {
    correlationName = "Функціональна кореляція";
  }

  return { correlationName, correlationType };
}
