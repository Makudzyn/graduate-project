export default function matrixRow(n: number, poly) {
  let tmp = [];
  for (let i = 0; i < n; i++) {
    tmp.push(parseInt(poly[i]));
  }
  return tmp;
}

export default function createMatrix(n: number, initialState) {
  let matrix = [];
  matrix[0] = initialState;
  for (let i = 1; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = (i === (j+1) ? 1 : 0);
    }
  }
  return matrix;
}

export default function linearFeedbackShiftRegister(steps, initialState, structureMatrix){
  let matrix = [];
  let currentStates = initialState.split("");
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

export default function hammingWeightCalc(sequence) {
  let weight = 0;
  for (let i = 0; i < sequence.length; i++) {
    if (parseInt(sequence[i]) !== 0) {
      weight++;
    }
  }
  return weight;
}

export default function convertPrs(prs) {
  return prs.map(i => (i === 1 ? -1 : 1));
}
