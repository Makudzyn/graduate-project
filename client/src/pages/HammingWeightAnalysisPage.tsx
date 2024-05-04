import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  hammingBlockCalculations,
} from "../functions/requestFunctions/calculationRequestFunctions.ts";
import { observer } from "mobx-react-lite";
import {
  PARAMS_CYCLIC_POLY_A,
  PARAMS_CYCLIC_POLY_B,
  PARAMS_DEGREE,
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_HAMMING_BLOCK,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B
} from "../utils/consts.ts";
import MatrixGenerator from "../components/MatrixGenerator/MatrixGenerator.tsx";
import usePolynomialsFetching from "../hooks/fetching/usePolynomialsFetching.ts";
import GenButton from "../components/CommonGenComponents/GenButton.tsx";
import HammingChart from "../components/Chart/Plotly/HammingChart.tsx";
import { Context } from "../main.tsx";
import Spinner from "../components/Spinner.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import { handleHistoryRecordCreation } from "../functions/requestFunctions/requestFunctions.ts";
import useHistoryFetching from "../hooks/fetching/useHistoryFetching.ts";
import InputBlockLength from "../components/HammingAnalysis/InputBlockLength.tsx";
import Modal from "../components/Modal/Modal.tsx";
import { linearValidationBeforeCalculations, matrixValidationBeforeCalculations } from "../functions/functions.ts";
import Section from "../components/CommonGenComponents/Section.tsx";
import PageWrapper from "../components/CommonGenComponents/PageWrapper.tsx";
import PageHeader from "../components/CommonGenComponents/PageHeader.tsx";

const HammingWeightAnalysisPage = observer(() => {
  const { polynomialsStore, userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePolynomialsFetching(polynomialsStore, setLoading, setError);

  if (userStore.isAuth) {
    useHistoryFetching(userStore, setLoading, setError);
  }

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);

  const [conditionMatrixLinear, setConditionMatrixLinear] = useState<number[][]>([]);
  const [conditionMatrixMatrices, setConditionMatrixMatrices] = useState<number[][]>([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);

  const [potentialPeriodLengthA, setPotentialPeriodLengthA] = useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] = useState<number>(0);
  const [potentialPeriodLengthS, setPotentialPeriodLengthS] = useState<number>(0);

  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);
  const [factualPeriodLengthS, setFactualPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [pseudorandomSequenceLinear, setPseudorandomSequenceLinear] = useState<
    number[]
  >([]);
  const [pseudorandomSequenceMatrices, setPseudorandomSequenceMatrices] =
    useState<number[]>([]);

  const [hammingWeightLinear, setHammingWeightLinear] = useState<number>(0);
  const [hammingWeightMatrices, setHammingWeightMatrices] = useState<number>(0);
  const [hammingWeightSpectre, setHammingWeightSpectre] = useState<string[]>([
    "0",
  ]);

  const [linearSeqBlockLengths, setLinearSeqBlockLengths] = useState<number[]>(
    [],
  );
  const [matrixSeqBlockLengths, setMatrixSeqBlockLengths] = useState<number[]>(
    [],
  );
  const [sharedWeights, setSharedWeights] = useState<number[]>([]);
  const [valueRestriction, setValueRestriction] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    const linearLength = pseudorandomSequenceLinear.length;
    const matrixLength = pseudorandomSequenceMatrices.length;
    const maxAllowedBlockLength = Math.min(linearLength, matrixLength);
    setValueRestriction(maxAllowedBlockLength);
  }, [pseudorandomSequenceLinear, pseudorandomSequenceMatrices]);

  const handleFirstGenClick = () => {
    linearValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE,
      PARAMS_POLYNOMIAL,
      PARAMS_USER_VALUE,
      setStructureMatrix,
      setConditionMatrixLinear,
      setPotentialPeriodLength,
      setFactualPeriodLength,
      setPseudorandomSequenceLinear,
      setHammingWeightLinear,
      setLoading,
      setError,
    );
  };

  const handleSecondGenClick = () => {
    matrixValidationBeforeCalculations(
      searchParams,
      PARAMS_DEGREE_A, PARAMS_DEGREE_B,
      PARAMS_POLYNOMIAL_A, PARAMS_POLYNOMIAL_B,
      PARAMS_CYCLIC_POLY_A, PARAMS_CYCLIC_POLY_B,
      PARAMS_OUTPUT_INDEX_I, PARAMS_OUTPUT_INDEX_J, PARAMS_MATRIX_RANK,
      setStructureMatrixA, setStructureMatrixB,
      setConditionMatrixMatrices, setBasisMatrix,
      setPotentialPeriodLengthA, setPotentialPeriodLengthB, setFactualPeriodLengthS,
      setFactualPeriodLengthA, setFactualPeriodLengthB, setPotentialPeriodLengthS,
      setConditionS,
      setPseudorandomSequenceMatrices,
      setHammingWeightMatrices, setHammingWeightSpectre,
      setLoading, setError
    )
  };


  const handleClick = () => {
    hammingBlockCalculations(
      searchParams,
      PARAMS_HAMMING_BLOCK,
      pseudorandomSequenceLinear,
      pseudorandomSequenceMatrices,
      setLinearSeqBlockLengths,
      setMatrixSeqBlockLengths,
      setSharedWeights,
      setLoading,
      setError,
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
      {error && <Modal message={error} setError={setError} type={"error"}/>}

      <Section>
        <PageWrapper>
          <PageHeader>Аналіз ваг Хеммінгу</PageHeader>

          <div className="flex">
            <div className="w-1/4 px-5">
              <LinearGenerator
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                structureMatrix={structureMatrix}
                conditionMatrix={conditionMatrixLinear}
                potentialPeriodLength={potentialPeriodLength}
                factualPeriodLength={factualPeriodLength}
                pseudorandomSequence={pseudorandomSequenceLinear}
                hammingWeight={hammingWeightLinear}
                degreeParam={PARAMS_DEGREE}
                polynomialParam={PARAMS_POLYNOMIAL}
                userValueParam={PARAMS_USER_VALUE}
                onClick={handleFirstGenClick}
              />
            </div>
            <div className="w-3/4 px-5">
              <MatrixGenerator
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                structureMatrixA={structureMatrixA}
                structureMatrixB={structureMatrixB}
                basisMatrix={basisMatrix}
                conditionMatrix={conditionMatrixMatrices}
                potentialPeriodLengthA={potentialPeriodLengthA}
                potentialPeriodLengthB={potentialPeriodLengthB}
                potentialPeriodLengthS={potentialPeriodLengthS}
                factualPeriodLengthA={factualPeriodLengthA}
                factualPeriodLengthB={factualPeriodLengthB}
                factualPeriodLengthS={factualPeriodLengthS}
                conditionS={conditionS}
                identifierS={"S"}
                pseudorandomSequence={pseudorandomSequenceMatrices}
                hammingWeight={hammingWeightMatrices}
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
                onClick={handleSecondGenClick}
              />
            </div>
          </div>
          <div className="my-5 flex flex-col items-center justify-center">
            <InputBlockLength
              inputLabel="Довжина блоку"
              inputPlaceholder="2"
              urlParamName={PARAMS_HAMMING_BLOCK}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
              valueRestriction={valueRestriction}
            />
            <GenButton onClick={handleClick}>Провести розрахунки</GenButton>
          </div>

          <div className="flex h-full w-full items-center justify-center">
            <HammingChart
              data1={linearSeqBlockLengths}
              data2={matrixSeqBlockLengths}
              xAxisLabels={sharedWeights}
            />
          </div>
        </PageWrapper>
      </Section>
    </>
  );
});

export default HammingWeightAnalysisPage;
