import MatrixSelect from "./MatrixSelect.tsx";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B, POLYNOMIAL_TYPE_A, POLYNOMIAL_TYPE_B
} from "../../utils/consts.ts";
import MatrixOutputSelectionBlock from "./MatrixOutputSelectionBlock.tsx";
import { useContext, useEffect, useState } from "react";
import {
  generateOptions,
  getSelectedParam,
} from "../../functions/functions.ts";
import { useLocation, useSearchParams } from "react-router-dom";
import { calculatePossibleValues } from "../../functions/generatorFunctions.ts";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { Polynomial } from "../../utils/interfacesAndTypes.ts";

const MatrixInputBlock = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  const [searchParams, setSearchParams] = useSearchParams({
    degree_a: "2",
    polynomial_a: "1 7 H",
    degree_b: "2",
    polynomial_b: "1 7 H",
    index_i: "0",
    index_j: "0",
    matrix_rank: "1",
  });

  const location = useLocation();

  const [polynomialArrA, setPolynomialArrA] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const [polynomialArrB, setPolynomialArrB] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const options = generateOptions();

  const [outputValuesI, setOutputValuesI] = useState<number[]>([0]);
  const [outputValuesJ, setOutputValuesJ] = useState<number[]>([0]);
  const [matrixRank, setMatrixRank] = useState<number[]>([1]);

  useEffect(() => {
    const degreeA = getSelectedParam(PARAMS_DEGREE_A, searchParams);
    const degreeB = getSelectedParam(PARAMS_DEGREE_B, searchParams);
    const polynomialA = getSelectedParam(PARAMS_POLYNOMIAL_A, searchParams);
    const polynomialB = getSelectedParam(PARAMS_POLYNOMIAL_B, searchParams);

    const indexI = getSelectedParam(PARAMS_OUTPUT_INDEX_I, searchParams);
    const indexJ = getSelectedParam(PARAMS_OUTPUT_INDEX_J, searchParams);
    const matrixRank = getSelectedParam(PARAMS_MATRIX_RANK, searchParams);

    const numDegreeA = Number(degreeA);
    const numDegreeB = Number(degreeB);

    calculationInfoStore.setManyInputValues({
      degreeA: numDegreeA,
      polynomialA,
      degreeB: numDegreeB,
      polynomialB,
      indexI: Number(indexI),
      indexJ: Number(indexJ),
      matrixRank: Number(matrixRank),
    });

    setPolynomialArrA(
      polynomialsStore.polynomials.filter((poly) => poly.degree === numDegreeA),
    );

    setPolynomialArrB(
      polynomialsStore.polynomials.filter((poly) => poly.degree === numDegreeB),
    );

    const valuesArrayI = calculatePossibleValues(numDegreeA);
    const valuesArrayJ = calculatePossibleValues(numDegreeB);
    const minDegree = Math.min(numDegreeA, numDegreeB);
    const rankValues = calculatePossibleValues(minDegree, 1);

    setOutputValuesI(valuesArrayI);
    setOutputValuesJ(valuesArrayJ);
    setMatrixRank(rankValues);
  }, [location.search]);

  return (
    <>
      <MatrixSelect
        firstSelectLabel={`Оберіть ступінь поліному F(${POLYNOMIAL_TYPE_A})`}
        secondSelectLabel={`Поліном F(${POLYNOMIAL_TYPE_A})`}
        degreeParamName={PARAMS_DEGREE_A}
        polynomialParamName={PARAMS_POLYNOMIAL_A}
        degreeArray={options}
        polynomialArray={polynomialArrA}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <MatrixOutputSelectionBlock
        firstOutputElementLabel={"Значення i вихідного елементу"}
        firstOptionsArray={outputValuesI}
        firstUrlParamName={PARAMS_OUTPUT_INDEX_I}
        secondOutputElementLabel={"Значення j вихідного елементу"}
        secondOptionsArray={outputValuesJ}
        secondUrlParamName={PARAMS_OUTPUT_INDEX_J}
        thirdOutputElementLabel={"Ранг матриці S"}
        thirdOptionsArray={matrixRank}
        thirdUrlParamName={PARAMS_MATRIX_RANK}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <MatrixSelect
        firstSelectLabel={`Оберіть ступінь поліному F(${POLYNOMIAL_TYPE_B})`}
        secondSelectLabel={`Поліном F(${POLYNOMIAL_TYPE_B})`}
        degreeParamName={PARAMS_DEGREE_B}
        polynomialParamName={PARAMS_POLYNOMIAL_B}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        degreeArray={options}
        polynomialArray={polynomialArrB}
      />
    </>
  );
});

export default MatrixInputBlock;
