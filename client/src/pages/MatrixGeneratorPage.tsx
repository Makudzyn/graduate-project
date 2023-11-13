import { useContext, useEffect, useState } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";
import { Context } from "../main.tsx";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B, PARAMS_MATRIX_RANK, PARAMS_OUTPUT_INDEX_I, PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
} from "../utils/consts.ts";
import {
  generateOptions,
  getSelectedDegree,
  getSelectedPolynomial,
} from "../functions/functions.ts";
import { Polynomial } from "../store/PolynomialsStore.ts";
import MatrixSelect from "../components/MatrixGenerator/MatrixSelect.tsx";
import MatrixOutputSelectionBlock from "../components/MatrixGenerator/MatrixOutputSelectionBlock.tsx";
import {outputElementPossibleValues} from "../functions/generatorFunctions.ts";

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
    matrix_rank: "0",
  });

  const [polynomialArrA, setPolynomialArrA] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const [polynomialArrB, setPolynomialArrB] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const options = generateOptions();

  const [outputValuesI, setOutputValuesI] = useState<number[]>([]);
  const [outputValuesJ, setOutputValuesJ] = useState<number[]>([]);

  const location = useLocation();

  useEffect(() => {
    const selectedDegreeA = getSelectedDegree(
      PARAMS_DEGREE_A,
      searchParams,
    );
    const selectedDegreeB = getSelectedDegree(
      PARAMS_DEGREE_B,
      searchParams,
    );
    const selectedPolynomialA = getSelectedPolynomial(
      PARAMS_POLYNOMIAL_A,
      searchParams,
    );
    const selectedPolynomialB = getSelectedPolynomial(
      PARAMS_POLYNOMIAL_B,
      searchParams,
    );

    calculationInfoStore.setAllInputValues(
      selectedDegreeA,
      selectedDegreeB,
      selectedPolynomialA,
      selectedPolynomialB,
    );

    const numDegreeA = Number(selectedDegreeA);
    const numDegreeB = Number(selectedDegreeB);

    setPolynomialArrA(
      polynomialsStore.polynomials.filter(
        (poly) => poly.degree === numDegreeA,
      ),
    );

    setPolynomialArrB(
      polynomialsStore.polynomials.filter(
        (poly) => poly.degree === numDegreeB,
      ),
    );

    setOutputValuesI(outputElementPossibleValues(numDegreeA));
    setOutputValuesJ(outputElementPossibleValues(numDegreeB));
  }, [location.search]);

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
            thirdOptionsArray={[1, 2, 3, 4, 5]}
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

        {/*<div className={"flex justify-center items-center p-2.5 mb-5"}>*/}
        {/*  <Button onClick={calculations}>Розпочати генерацію</Button>*/}
        {/*</div>*/}

        {/*<div className="flex items-center justify-center gap-2">*/}
        {/*  <div>*/}
        {/*    <h3 className="text-center">Структурна матриця</h3>*/}
        {/*    <Matrix dataArray={structureMatrix} />*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <h3 className="text-center">Послідовність станів регістру</h3>*/}
        {/*    <Matrix dataArray={conditionMatrix} />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="my-5 flex justify-center">*/}
        {/*  <div className="flex w-3/4 justify-between">*/}
        {/*    <h5>Період по формулі T = {periodLengthByFormula}</h5>*/}
        {/*    <h5>Експериментальний період T = {experimentalPeriodLength}</h5>*/}
        {/*    <h5>*/}
        {/*      Вид послідовності ={" "}*/}
        {/*      {periodLengthByFormula === experimentalPeriodLength ? "M" : "C"}*/}
        {/*      -послідовність*/}
        {/*    </h5>*/}
        {/*    <h5>Вага Хеммінгу = {hammingWeight}</h5>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<label>Згенерована послідовність</label>*/}
        {/*<Sequence dataArray={prsSequence} />*/}

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
