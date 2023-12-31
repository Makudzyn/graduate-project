import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import { useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  linearCalculations,
  matrixCalculations,
} from "../functions/calculationRequestFunctions.ts";
import { Context } from "../main.tsx";
import { observer } from "mobx-react-lite";
import {
  PARAMS_DEGREE,
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_MATRIX_RANK,
  PARAMS_OUTPUT_INDEX_I,
  PARAMS_OUTPUT_INDEX_J,
  PARAMS_POLYNOMIAL,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE, POLYNOMIAL_TYPE_A, POLYNOMIAL_TYPE_B
} from "../utils/consts.ts";
import MatrixGenerator from "../components/MatrixGenerator.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";

const HammingWeightAnalysisPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);

  const [conditionMatrixLinear, setConditionMatrixLinear] = useState<
    number[][]
  >([]);
  const [conditionMatrixMatrices, setConditionMatrixMatrices] = useState<
    number[][]
  >([]);
  const [basisMatrix, setBasisMatrix] = useState<number[][]>([]);

  const [potentialPeriodLength, setPotentialPeriodLength] = useState<number>(0);
  const [factualPeriodLength, setFactualPeriodLength] = useState<number>(0);

  const [potentialPeriodLengthA, setPotentialPeriodLengthA] =
    useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] =
    useState<number>(0);
  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);
  const [periodLengthS, setPeriodLengthS] = useState<number>(0);
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

  const [correlationLinear, setCorrelationLinear] = useState<number[]>([]);
  const [correlationMatrices, setCorrelationMatrices] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({
    degree: "2",
    polynomial: "1 7 H",
    value: "01",
    degree_a: "2",
    polynomial_a: "1 7 H",
    degree_b: "2",
    polynomial_b: "1 7 H",
    index_i: "0",
    index_j: "0",
    matrix_rank: "1",
  });

  usePolynomialsFetching(fetchPolynomials, polynomialsStore);
  return (
    <div className="flex justify-between">
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
        onClick={() =>
          linearCalculations(
            calculationInfoStore,
            setStructureMatrix,
            setConditionMatrixLinear,
            setPotentialPeriodLength,
            setFactualPeriodLength,
            setPseudorandomSequenceLinear,
            setHammingWeightLinear,
            setCorrelationLinear,
          )
        }
      />
      <MatrixGenerator
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        structureMatrixA={structureMatrixA}
        structureMatrixB={structureMatrixB}
        basisMatrix={basisMatrix}
        conditionMatrix={conditionMatrixMatrices}
        potentialPeriodLengthA={potentialPeriodLengthA}
        potentialPeriodLengthB={potentialPeriodLengthB}
        factualPeriodLengthA={factualPeriodLengthA}
        factualPeriodLengthB={factualPeriodLengthB}
        periodLengthS={periodLengthS}
        conditionS={conditionS}
        identifierS={"S"}
        pseudorandomSequence={pseudorandomSequenceMatrices}
        hammingWeight={hammingWeightMatrices}
        hammingWeightSpectre={hammingWeightSpectre}
        degreeParamA={PARAMS_DEGREE_A}
        degreeParamB={PARAMS_DEGREE_B}
        polynomialParamA={PARAMS_POLYNOMIAL_A}
        polynomialParamB={PARAMS_POLYNOMIAL_B}
        indexParamI={PARAMS_OUTPUT_INDEX_I}
        indexParamJ={PARAMS_OUTPUT_INDEX_J}
        matrixRankParam={PARAMS_MATRIX_RANK}
        polynomialTypeA={POLYNOMIAL_TYPE_A}
        polynomialTypeB={POLYNOMIAL_TYPE_B}
        onClick={() =>
          matrixCalculations(
            calculationInfoStore,
            setStructureMatrixA,
            setStructureMatrixB,
            setConditionMatrixMatrices,
            setBasisMatrix,
            setPotentialPeriodLengthA,
            setPotentialPeriodLengthB,
            setFactualPeriodLengthA,
            setFactualPeriodLengthB,
            setPeriodLengthS,
            setConditionS,
            setPseudorandomSequenceMatrices,
            setHammingWeightMatrices,
            setHammingWeightSpectre,
            setCorrelationMatrices,
          )
        }
      />
    </div>
  );
});

export default HammingWeightAnalysisPage;
