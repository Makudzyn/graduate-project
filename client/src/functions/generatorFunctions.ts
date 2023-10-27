export function matrixRow(degree: number, polynomial: string[]): number[] {
  let tmp: number[] = [];
  for (let i = 0; i < degree; i++) {
    tmp.push(Number(polynomial[i]));
  }
  return tmp;
}

export function createMatrix(degree: number, structureRow: number[]): number[][] {
  let matrix: number[][] = [];
  matrix[0] = structureRow;
  for (let i = 1; i < degree; i++) {
    matrix[i] = [];
    for (let j = 0; j < degree; j++) {
      matrix[i][j] = (i === (j+1) ? 1 : 0);
    }
  }
  return matrix;
}

// export function linearFeedbackShiftRegister(steps, initialState, structureMatrix){
//   let matrix = [];
//   let currentStates = initialState.split("");
//   matrix.push(currentStates);
//
//   for (let i = 1; i < steps; i++) {
//     let nextStates = [];
//     for (let j = 0; j < structureMatrix.length; j++) {
//       let row = structureMatrix[j];
//       let sum = 0;
//       for (let k = 0; k < row.length; k++) {
//         sum += row[k] * currentStates[k];
//       }
//       nextStates.push(sum % 2);
//     }
//
//     currentStates = nextStates;
//     matrix.push(currentStates);
//   }
//   return matrix;
// }

// export function hammingWeightCalc(sequence) {
//   let weight = 0;
//   for (let i = 0; i < sequence.length; i++) {
//     if (parseInt(sequence[i]) !== 0) {
//       weight++;
//     }
//   }
//   return weight;
// }

// export function convertPrs(prs: number[]) {
//   return prs.map(i => (i === 1 ? -1 : 1));
// }

// export function autocorrelation(prs) {
//   const N = prs.length;
//   const result = [];
//
//   for (let delay = 0; delay < N; delay++) {
//     let sum = 0;
//     for (let i = 0; i < N; i++) {
//       sum += prs[i] * prs[(i + delay) % N];
//     }
//     result.push(sum / N);
//   }
//   result.push(result[0]);
//   return result;
// }

//n=degree, initialState=userValue, poly=polynomial
export function generate(degree: string, polynomial:string, userValue:string) {
  const degreeNum = Number(degree);
  const polyArr = polynomial.split("");

  const structureRow = matrixRow(degreeNum, polyArr);
  const structureMatrix = createMatrix(degreeNum, structureRow);
  console.log(structureMatrix);
  // structureMatrixField.innerHTML = structureMatrix.map(row => row.join(" ")).join("\n");
  //
  // const periodFormula = Math.pow(2, degree) - 1;
  // periodFormulaField.innerHTML = `Період по формулі T = ${periodFormula}`;
  //
  // const conditionMatrix = linearFeedbackShiftRegister(periodFormula, initialState, structureMatrix);
  //
  // stateMatrixField.innerHTML = conditionMatrix.map(row => row.join(" ")).join("\n");
  //
  // //Розрахунок експериментального періоду
  // let periodExp = 0;
  // let startState = [];
  // for (let i = 0; i < degree; i++) {
  //   startState[i] = 1;
  // }
  // let currentState = startState.slice();
  // while (periodExp === 0 || currentState.join("") !== startState.join("")) {
  //   let nextState = [];
  //   for (let i = 0; i < degree; i++) {
  //     nextState[i] = 0;
  //     for (let j = 0; j < degree; j++) {
  //       nextState[i] = nextState[i] ^ (currentState[j] * structureMatrix[i][j]);
  //     }
  //   }
  //   currentState = nextState.slice();
  //   periodExp++;
  // }
  // periodExperimentField.innerHTML = `Експериментальний період T = ${periodExp}`;
  //
  // if (periodFormula === periodExp) {
  //   prsType.innerText = "Вид послідовності: М-послідовність";
  // } else {
  //   prsType.innerText = "Вид послідовності: C-послідовність";
  // }
  //
  // //Запис отриманної послідовності
  // let pseudorandomSequence = [];
  // conditionMatrix.forEach(row => {
  //   pseudorandomSequence.push(row[row.length - 1]);
  // });
  //
  // pseudorandomSequenceField.innerHTML = pseudorandomSequence.join(" ");
  //
  // //Вага Хеммінга
  // hammingWeight.innerHTML = `Вага Хеммінгу = ${hammingWeightCalc(pseudorandomSequence)}`;
  //
  // const convertedPrs = convertPrs(pseudorandomSequence);
  //
  // //Розрахування та побудова АКФ
  // autocorrelationPrint(convertedPrs);

}