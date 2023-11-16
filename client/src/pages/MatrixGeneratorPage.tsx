import { useContext, useEffect, useState } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";
import { Context } from "../main.tsx";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
} from "../utils/consts.ts";
import {
  generateOptions,
  getSelectedDegree,
  getSelectedParam,
  getSelectedPolynomial,
} from "../functions/functions.ts";
import { Polynomial } from "../store/PolynomialsStore.ts";
import MatrixSelect from "../components/MatrixGenerator/MatrixSelect.tsx";
import MatrixOutputSelectionBlock from "../components/MatrixGenerator/MatrixOutputSelectionBlock.tsx";
import {
  calcLengthByFormula,
  calculatePossibleValues,
  createMatrixInitialArray,
  experimentalPeriodLengthCalc,
  generateMatrixBasis,
  generateStructureMatrixA,
  generateStructureMatrixB, matrixShiftRegister,
  polynomialDestructuring,
} from "../functions/generatorFunctions.ts";
import Button from "../components/Button.tsx";
import Matrix from "../components/Matrix.tsx";
import Sequence from "../components/Sequence.tsx";

const MatrixGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  useEffect(() => {
    fetchPolynomials().then((data) => polynomialsStore.setPolynomials(data));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams({
    degree_a: "2",
    polynomial_a: "1 7 H",
    degree_b: "2",
    polynomial_b: "1 7 H",
    index_i: "0",
    index_j: "0",
    matrix_rank: "1",
  });

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

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>([]);


  const [periodLengthByFormulaA, setPeriodLengthByFormulaA] =
    useState<number>(0);
  const [periodLengthByFormulaB, setPeriodLengthByFormulaB] =
    useState<number>(0);
  const [periodLengthByFormulaS, setPeriodLengthByFormulaS] =
    useState<number>(0);
  const [experimentalPeriodLengthA, setExperimentalPeriodLengthA] =
    useState<number>(0);
  const [experimentalPeriodLengthB, setExperimentalPeriodLengthB] =
    useState<number>(0);


  const location = useLocation();

  useEffect(() => {
    const degreeA = getSelectedParam(PARAMS_DEGREE_A, searchParams);
    const degreeB = getSelectedParam(PARAMS_DEGREE_B, searchParams);
    const polynomialA = getSelectedParam(PARAMS_POLYNOMIAL_A, searchParams);
    const polynomialB = getSelectedParam(PARAMS_POLYNOMIAL_B, searchParams);

    const indexI = getSelectedParam(PARAMS_OUTPUT_INDEX_I, searchParams);
    const indexJ = getSelectedParam(PARAMS_OUTPUT_INDEX_J, searchParams);
    const matrixRank = getSelectedParam(PARAMS_MATRIX_RANK, searchParams);

    calculationInfoStore.setAllInputValues(
      degreeA,
      polynomialA,
      degreeB,
      polynomialB,
      indexI,
      indexJ,
      matrixRank,
    );

    const numDegreeA = Number(degreeA);
    const numDegreeB = Number(degreeB);

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

  function calculations() {
    const {
      degreeA,
      polynomialA,
      degreeB,
      polynomialB,
      indexI,
      indexJ,
      matrixRank,
    } = calculationInfoStore.allInputValues;

    const degreeNumA = Number(degreeA);
    const degreeNumB = Number(degreeB);
    const indexNumI = Number(indexI);
    const indexNumJ = Number(indexJ);
    const matrixRankNum = Number(matrixRank);

    const { polyIndex: polyIndexA, polyBinary: polyBinaryA } =
      polynomialDestructuring(polynomialA);
    const { polyIndex: polyIndexB, polyBinary: polyBinaryB } =
      polynomialDestructuring(polynomialB);

    const polynomialArrA = polyBinaryA.split("").slice(1);
    const polynomialArrB = polyBinaryB.split("").slice(1);

    const structureMatrixA = generateStructureMatrixA(
      degreeNumA,
      createMatrixInitialArray(degreeNumA, polynomialArrA),
    );

    const structureMatrixB = generateStructureMatrixB(
      degreeNumB,
      createMatrixInitialArray(degreeNumB, polynomialArrB),
    );

    const basisMatrix = generateMatrixBasis(
      degreeNumA,
      degreeNumB,
      matrixRankNum,
    );


    const lengthByFormulaA = calcLengthByFormula(degreeNumA, polyIndexA);
    const lengthByFormulaB = calcLengthByFormula(degreeNumB, polyIndexB);
    const lengthByFormulaS = lengthByFormulaA * lengthByFormulaB;

    setPeriodLengthByFormulaA(lengthByFormulaA);
    setPeriodLengthByFormulaB(lengthByFormulaB);
    setPeriodLengthByFormulaS(lengthByFormulaS);

    const experimentalPeriodLengthA = experimentalPeriodLengthCalc(
      structureMatrixA,
      degreeNumA,
    );
    const experimentalPeriodLengthB = experimentalPeriodLengthCalc(
      structureMatrixB,
      degreeNumB,
    );


    setExperimentalPeriodLengthA(experimentalPeriodLengthA);
    setExperimentalPeriodLengthB(experimentalPeriodLengthB);

    setBasisMatrix(basisMatrix);
    setStructureMatrixA(structureMatrixA);
    setStructureMatrixB(structureMatrixB);

    const {conditionMatrix, generatedPrs} = matrixShiftRegister(structureMatrixA, structureMatrixB, basisMatrix, lengthByFormulaS, indexNumI, indexNumJ);


    setConditionMatrix(conditionMatrix);
    setPseudorandomSequence(generatedPrs);
  }

  return (
    <section className="flex h-full justify-center">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">Матрічний ЗРЗЗ (МРЗ)</h1>

        <div className={"flex w-full justify-evenly pb-9 pt-2.5"}>
          <MatrixSelect
            firstSelectLabel={"Оберіть ступінь поліному F(A)"}
            secondSelectLabel={"Поліном F(A)"}
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
            firstSelectLabel={"Оберіть ступінь поліному F(B)"}
            secondSelectLabel={"Поліном F(B)"}
            degreeParamName={PARAMS_DEGREE_B}
            polynomialParamName={PARAMS_POLYNOMIAL_B}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            degreeArray={options}
            polynomialArray={polynomialArrB}
          />
        </div>

        <div className={"flex justify-center items-center p-2.5 mb-5"}>
          <Button onClick={calculations}>Розпочати генерацію</Button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div>
            <h3 className="text-center">Структурна матриця F(A)</h3>
            <Matrix dataArray={structureMatrixA} />
          </div>
          <div>
            <h3 className="text-center">Матриця S[0]</h3>
            <Matrix dataArray={basisMatrix} />
          </div>
          <div>
            <h3 className="text-center">Структурна матриця F(B)</h3>
            <Matrix dataArray={structureMatrixB} />
          </div>
        </div>

        <div className="my-5 flex justify-center">
          <div className="flex w-3/4 justify-between">
            <h5>Період по формулі T(A) = {periodLengthByFormulaA}</h5>
            <h5>Експериментальний період T(A) = {experimentalPeriodLengthA}</h5>
            <h5>Період по формулі T(B) = {periodLengthByFormulaB}</h5>
            <h5>Експериментальний період T(B) = {experimentalPeriodLengthB}</h5>
            <h5>
            </h5>
          </div>
        </div>

        <div>
          <h3 className="text-center">Матриці S[1..N]</h3>
          <Matrix dataArray={conditionMatrix}/>
          <h5>Період по формулі T(S) = {periodLengthByFormulaS}</h5>
        </div>

        <label>Згенерована послідовність</label>
        <Sequence dataArray={pseudorandomSequence} />

        {/*{correlationObjectDots[0] ?*/}
        {/*  <Chart data={correlationObjectDots}/>*/}
        {/*  :*/}
        {/*  <div className={"w-full h-[600px] border-2 rounded-md mb-5 flex justify-center items-center text-3xl text-gray-500"}>Chart</div>*/}
        {/*}*/}
      </div>
    </section>
  );
});

export default MatrixGeneratorPage;
