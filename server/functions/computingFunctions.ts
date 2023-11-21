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

export {
  autocorrelation,
  convertPrs,
  generateStructureMatrixA,
};