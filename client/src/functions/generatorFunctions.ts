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
  const tmp: number[] = [];
  for (let i = 0; i < degree; i++) {
    tmp.push(Number(polynomial[i]));
  }
  return tmp;
}

export function generateStructureMatrixA(
  degree: number,
  structureRow: number[],
): number[][] {
  const structureMatrix: number[][] = [];
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
  const structureMatrix: number[][] = [];
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

export function inverseMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  const m = matrix[0].length;

  const augmentedMatrix = Array.from({ length: n }, () => Array(m * 2).fill(0));

  for (let j = 0; j < m; j++) {
    for (let i = 1; i < n; i++) {
      augmentedMatrix[i - 1][j] = matrix[i][j];
    }
    augmentedMatrix[n - 1][j] = matrix[0][j];
  }

  for (let j = m; j < m * 2; j++) {
    for (let i = 0; i < n - 1; i++) {
      augmentedMatrix[i][j] = i === j - m - 1 ? 1 : 0;
    }
    augmentedMatrix[n - 1][j] = j - m === 0 ? 1 : 0;
  }

  for (let i = 0; i < m - 1; i++) {
    if (augmentedMatrix[n - 1][i] === 1) {
      for (let j = 0; j < m * 2; j++) {
        augmentedMatrix[n - 1][j] = convertBinary(
          augmentedMatrix[n - 1][j] - augmentedMatrix[i][j],
        );
      }
    }
  }

  const inverse = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      inverse[i][j] = augmentedMatrix[i][j + m];
    }
  }

  return inverse;
}

function convertBinary(value: number): number {
  return ((value % 2) + 2) % 2;
}

export function createEmptyMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function createFrobeniusMatrix(
  n: number,
  polynomials: string[],
): number[][] {
  const frobeniusMatrix = createEmptyMatrix(n, n);
  let i = 0;

  for (const polynomial of polynomials) {
    const degree = polynomial.length - 1;

    if (degree === 0) {
      frobeniusMatrix[i][i] = 1;
      i += 1;
    } else {
      const polynomialArr = polynomial.split("").slice(1);
      const structureMatrix = generateStructureMatrixA(
        degree,
        createMatrixInitialArray(degree, polynomialArr),
      );
      for (let j = 0; j < degree; j++) {
        for (let k = 0; k < degree; k++) {
          frobeniusMatrix[i + j][i + k] = structureMatrix[j][k];
        }
      }
      i += degree;
    }
  }

  return frobeniusMatrix;
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
    const remainder = a % b;
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
  const result = [];
  for (let i = 1; i <= rankS; i++) {
    const tmp = (Math.pow(2, i) - 1) * Math.pow(2, degreeA + degreeB - 1 - i);
    result.push(tmp);
  }
  return result;
}

export function formatHammingWeight(weightSpectre: number[]) {
  const textHammingWeight = [];
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

export function findClosestProductFactors(n: number): [number, number] | null {
  if (n <= 1) return null;

  let closestPair: [number, number] | null = null;
  let minDifference = Infinity;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      const pair: [number, number] = [i, n / i];
      const difference = Math.abs(pair[0] - pair[1]);

      if (difference < minDifference) {
        closestPair = pair;
        minDifference = difference;
      }
    }
  }

  return closestPair;
}

export function fillZigZagMatrix(
  arr: number[],
  n: number,
  m: number,
): (number | null)[][] {
  const matrix: (number | null)[][] = Array.from({ length: n }, () =>
    Array(m).fill(null),
  );

  let arrIndex = 0;
  let i = 0;
  let j = 0;

  while (arrIndex !== arr.length) {
    matrix[i][j] = arr[arrIndex] === 0 ? null : arr[arrIndex];
    i++;
    j++;
    arrIndex++;
    if (i === n) {
      i = 0;
    } else if (j === m) {
      j = 0;
    }
  }

  return matrix;
}

export function fillZigZagMatrixWithArr(initialMatrix: number[][][], periodA: number, periodB: number): number[][][][] {
  const matrix: number[][][][] = Array.from({ length: periodA }, () => Array(periodB).fill(null));

  let i = periodA - 1;
  let j = periodB - 1;
  let k = 0;

  while (k !== initialMatrix.length) {
    matrix[i][j] = initialMatrix[k];
    i--;
    j--;
    k++;
    if (i === -1) {
      i = periodA - 1;
    } else if (j === -1) {
      j = periodB - 1;
    }

  }


  return matrix;
}

export function mergeSubArrays(matrix: number[][], k: number): number[][][] {
  const result: number[][][] = [];
  let tempArray: number[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    tempArray.push(matrix[i]);
    if ((i + 1) % k === 0) {
      result.push(tempArray);
      tempArray = [];
    }
  }

  return result;
}

