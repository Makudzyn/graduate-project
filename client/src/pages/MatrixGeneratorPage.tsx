import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import CorrelationChart from "../components/Chart/Plotly/CorrelationChart.tsx";
import {
  PARAMS_CYCLIC_POLY_A,
  PARAMS_CYCLIC_POLY_B,
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B,
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import MatrixGenerator from "../components/MatrixGenerator/MatrixGenerator.tsx";
import { matrixCalculations } from "../functions/calculationRequestFunctions.ts";
import { Context } from "../main.tsx";
import Spinner from "../components/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";

const MatrixGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;

  const { loading, error } = usePolynomialsFetching(polynomialsStore);

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>(
    [],
  );
  const [potentialPeriodLengthA, setPotentialPeriodLengthA] =
    useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] =
    useState<number>(0);
  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);
  const [periodLengthS, setPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [hammingWeightSpectre, setHammingWeightSpectre] = useState<string[]>([
    "0",
  ]);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  return (
    <>
      {userStore.isAuth && <SideBar />}
      {loading && <Spinner />}

      {!error && !loading && (
        <section className="flex h-full justify-center pt-16">
          <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
            <h1 className="py-5 text-center">Матрічний ЗРЗЗ (МРЗ)</h1>

            <MatrixGenerator
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              structureMatrixA={structureMatrixA}
              structureMatrixB={structureMatrixB}
              basisMatrix={basisMatrix}
              conditionMatrix={conditionMatrix}
              potentialPeriodLengthA={potentialPeriodLengthA}
              potentialPeriodLengthB={potentialPeriodLengthB}
              factualPeriodLengthA={factualPeriodLengthA}
              factualPeriodLengthB={factualPeriodLengthB}
              periodLengthS={periodLengthS}
              conditionS={conditionS}
              identifierS={"S"}
              pseudorandomSequence={pseudorandomSequence}
              hammingWeight={hammingWeight}
              hammingWeightSpectre={hammingWeightSpectre}
              degreeParamA={PARAMS_DEGREE_A}
              degreeParamB={PARAMS_DEGREE_B}
              polynomialParamA={PARAMS_POLYNOMIAL_A}
              polynomialParamB={PARAMS_POLYNOMIAL_B}
              cyclicPolyParamA={PARAMS_CYCLIC_POLY_A}
              cyclicPolyParamB={PARAMS_CYCLIC_POLY_B}
              indexParamI={PARAMS_OUTPUT_INDEX_I}
              indexParamJ={PARAMS_OUTPUT_INDEX_J}
              matrixRankParam={PARAMS_MATRIX_RANK}
              polynomialTypeA={POLYNOMIAL_TYPE_A}
              polynomialTypeB={POLYNOMIAL_TYPE_B}
              onClick={() =>
                matrixCalculations(
                  searchParams,
                  PARAMS_DEGREE_A,
                  PARAMS_DEGREE_B,
                  PARAMS_POLYNOMIAL_A,
                  PARAMS_POLYNOMIAL_B,
                  PARAMS_CYCLIC_POLY_A,
                  PARAMS_CYCLIC_POLY_B,
                  PARAMS_OUTPUT_INDEX_I,
                  PARAMS_OUTPUT_INDEX_J,
                  PARAMS_MATRIX_RANK,
                  setStructureMatrixA,
                  setStructureMatrixB,
                  setConditionMatrix,
                  setBasisMatrix,
                  setPotentialPeriodLengthA,
                  setPotentialPeriodLengthB,
                  setFactualPeriodLengthA,
                  setFactualPeriodLengthB,
                  setPeriodLengthS,
                  setConditionS,
                  setPseudorandomSequence,
                  setHammingWeight,
                  setHammingWeightSpectre,
                  setCorrelation,
                )
              }
            />

            <div className="flex h-full w-full items-center justify-center">
              <CorrelationChart data1={correlation} />
            </div>
          </div>
        </section>
      )}
    </>
  );
});

export default MatrixGeneratorPage;
