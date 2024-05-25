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
): number[][] {
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

export function generateMatrixBasis(
  n: number,
  m: number,
  rank: number,
): number[][] {
  const state: number[][] = [];
  for (let i = 0; i < n; i++) {
    state[i] = [];
    for (let j = 0; j < m; j++) {
      state[i][j] = i === j && i < rank && j < rank ? 1 : 0;
    }
  }
  return state;
}

export function findGCD(
  potentialLength: number,
  polynomialIndex: number,
): number {
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

export function calculatePossibleValues(degree: number, start: number = 0) {
  return Array.from({ length: degree }, (_, index) => index + start);
}

export function generateCyclicPolynomial(degree: number) {
  return ("1" + "0".repeat(degree - 1)).split("");
}

export function formatArrayIfCyclic(
  isCyclic: string,
  degree: number,
  polyBinary: string,
) {
  let polynomialArr;
  if (isCyclic === "true") {
    polynomialArr = generateCyclicPolynomial(degree);
  } else {
    polynomialArr = polyBinary.split("").slice(1);
  }
  return polynomialArr;
}

export function defineCyclicLimitation(
  isCyclicA: string,
  isCyclicB: string,
  factualPeriodLengthA: number,
  factualPeriodLengthB: number,
) {
  if (isCyclicA === "true") {
    return factualPeriodLengthB;
  } else if (isCyclicB === "true") {
    return factualPeriodLengthA;
  }
  return undefined;
}
