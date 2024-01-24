import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  hammingBlockCalculations,
  linearCalculations,
  matrixCalculations,
} from "../functions/calculationRequestFunctions.ts";
import { Context } from "../main.tsx";
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
  POLYNOMIAL_TYPE_B,
} from "../utils/consts.ts";
import MatrixGenerator from "../components/MatrixGenerator.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import GenInput from "../components/Inputs/GenInput.tsx";
import GenButton from "../components/Buttons/GenButton.tsx";
import HammingChart from "../components/Chart/Plotly/HammingChart.tsx";

const HammingWeightAnalysisPage = observer(() => {
  const { polynomialsStore } = useContext(Context)!;

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

  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

  return (
    <section className="flex h-full justify-center pt-16">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">Аналіз ваг Хеммінгу</h1>

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
              onClick={() =>
                linearCalculations(
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
                )
              }
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
                )
              }
            />
          </div>
        </div>
        <div className="my-5 flex flex-col items-center justify-center">
          <GenInput
            inputLabel="Довжина блоку"
            inputPlaceholder="2"
            urlParamName={PARAMS_HAMMING_BLOCK}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            valueRestriction={valueRestriction}
            disabled={false}
          />
          <GenButton
            onClick={() =>
              hammingBlockCalculations(
                searchParams,
                PARAMS_HAMMING_BLOCK,
                pseudorandomSequenceLinear,
                pseudorandomSequenceMatrices,
                setLinearSeqBlockLengths,
                setMatrixSeqBlockLengths,
                setSharedWeights,
              )
            }
          >
            Провести розрахунки
          </GenButton>
        </div>

        <div className="flex h-full w-full items-center justify-center">
          <HammingChart
            data1={linearSeqBlockLengths}
            data2={matrixSeqBlockLengths}
            xAxisLabels={sharedWeights}
          />
        </div>
      </div>
    </section>
  );
});

export default HammingWeightAnalysisPage;
