import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
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
import { matrixCalculations } from "../functions/requestFunctions/calculationRequestFunctions.ts";
import { Context } from "../main.tsx";
import Spinner from "../components/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";

const MatrixGeneratorPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  if (userStore.isAuth) {
    useHistoryFetching(userStore, setLoading, setError);
  }

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>([]);
  const [potentialPeriodLengthA, setPotentialPeriodLengthA] = useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] = useState<number>(0);

  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);

  const [potentialPeriodLengthS, setPotentialPeriodLengthS] = useState<number>(0);
  const [factualPeriodLengthS, setFactualPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [hammingWeightSpectre, setHammingWeightSpectre] = useState<string[]>(["0"]);
  const [correlation, setCorrelation] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  const handleClick = () => {
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
      setFactualPeriodLengthS,
      setFactualPeriodLengthA,
      setFactualPeriodLengthB,
      setPotentialPeriodLengthS,
      setConditionS,
      setPseudorandomSequence,
      setHammingWeight,
      setHammingWeightSpectre,
      setLoading,
      setError,
      setCorrelation,
    );
    userStore.isAuth && handleHistoryRecordCreation(userStore.user.id);
  };

  return (
    <>
      {userStore.isAuth && (
        <SideBar
          dataArray={userStore.historyRecords}
          userId={userStore.user.id}
        />
      )}
      {loading && <Spinner />}

      <section className="flex h-full justify-center pt-16 px-5">
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
            potentialPeriodLengthS={potentialPeriodLengthS}
            factualPeriodLengthA={factualPeriodLengthA}
            factualPeriodLengthB={factualPeriodLengthB}
            factualPeriodLengthS={factualPeriodLengthS}
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
            onClick={handleClick}
          />

          <div className="flex h-full w-full items-center justify-center">
            <CorrelationChart data1={correlation} />
          </div>
        </div>
      </section>
    </>
  );
});

export default MatrixGeneratorPage;
