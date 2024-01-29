import { observer } from "mobx-react-lite";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE_A,
  PARAMS_USER_VALUE_B,
  POLYNOMIAL_TYPE_A,
  POLYNOMIAL_TYPE_B,
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import { findGCD } from "../functions/generatorFunctions.ts";
import {
  additionAndMultiplicationCalculations,
  linearCalculations,
} from "../functions/calculationRequestFunctions.ts";
import { useContext, useEffect, useState } from "react";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import HammingWeight from "../components/HammingWeight.tsx";
import Sequence from "../components/Sequence.tsx";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import GenButton from "../components/Buttons/GenButton.tsx";
import PeriodsCondition from "../components/PeriodsCondition.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import CorrelationChart from "../components/Chart/Plotly/CorrelationChart.tsx";
import CoprimeCondition from "../components/CoprimeCondition.tsx";
import { Context } from "../main.tsx";

const SumAndProductGeneratorPage = observer(() => {
  const { polynomialsStore } = useContext(Context)!;

  usePolynomialsFetching(polynomialsStore);

  const [structureMatrixA, setStructureMatrixA] = useState<number[][]>([]);
  const [structureMatrixB, setStructureMatrixB] = useState<number[][]>([]);

  const [conditionMatrixA, setConditionMatrixA] = useState<number[][]>([]);
  const [conditionMatrixB, setConditionMatrixB] = useState<number[][]>([]);

  const [potentialPeriodLengthA, setPotentialPeriodLengthA] =
    useState<number>(0);
  const [potentialPeriodLengthB, setPotentialPeriodLengthB] =
    useState<number>(0);

  const [factualPeriodLengthA, setFactualPeriodLengthA] = useState<number>(0);
  const [factualPeriodLengthB, setFactualPeriodLengthB] = useState<number>(0);

  const [periodLengthS, setPeriodLengthS] = useState<number>(0);
  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeightA, setHammingWeightA] = useState<number>(0);
  const [hammingWeightB, setHammingWeightB] = useState<number>(0);
  const [hammingWeightSum, setHammingWeightSum] = useState<number>(0);
  const [hammingWeightProduct, setHammingWeightProduct] = useState<number>(0);

  const [pseudorandomSequenceA, setPseudorandomSequenceA] = useState<number[]>(
    [],
  );
  const [pseudorandomSequenceB, setPseudorandomSequenceB] = useState<number[]>(
    [],
  );

  const [sumCorrelation, setSumCorrelation] = useState<number[]>([]);
  const [productCorrelation, setProductCorrelation] = useState<number[]>([]);

  const [sumSequence, setSumSequence] = useState<number[]>([]);
  const [productSequence, setProductSequence] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    if (factualPeriodLengthA !== 0 && factualPeriodLengthB !== 0) {
      const periodLengthS = factualPeriodLengthA * factualPeriodLengthB;
      setPeriodLengthS(periodLengthS);
      const condition = findGCD(factualPeriodLengthA, factualPeriodLengthB);
      setConditionS(condition);
    }
  }, [factualPeriodLengthA, factualPeriodLengthB]);

  return (
    <section className="flex h-full justify-center pt-16">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">
          ЗРЗЗ сум та множень М-послідовностей
        </h1>
        <div className="flex justify-evenly flex-row">
          <LinearGenerator
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            structureMatrix={structureMatrixA}
            conditionMatrix={conditionMatrixA}
            potentialPeriodLength={potentialPeriodLengthA}
            factualPeriodLength={factualPeriodLengthA}
            pseudorandomSequence={pseudorandomSequenceA}
            hammingWeight={hammingWeightA}
            degreeParam={PARAMS_DEGREE_A}
            polynomialParam={PARAMS_POLYNOMIAL_A}
            userValueParam={PARAMS_USER_VALUE_A}
            polynomialType={POLYNOMIAL_TYPE_A}
            identifier={`(${POLYNOMIAL_TYPE_A})`}
            onClick={() =>
              linearCalculations(
                searchParams,
                PARAMS_DEGREE_A,
                PARAMS_POLYNOMIAL_A,
                PARAMS_USER_VALUE_A,
                setStructureMatrixA,
                setConditionMatrixA,
                setPotentialPeriodLengthA,
                setFactualPeriodLengthA,
                setPseudorandomSequenceA,
                setHammingWeightA,
                setSumCorrelation,
              )
            }
          />
          <LinearGenerator
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            structureMatrix={structureMatrixB}
            conditionMatrix={conditionMatrixB}
            potentialPeriodLength={potentialPeriodLengthB}
            factualPeriodLength={factualPeriodLengthB}
            pseudorandomSequence={pseudorandomSequenceB}
            hammingWeight={hammingWeightB}
            degreeParam={PARAMS_DEGREE_B}
            polynomialParam={PARAMS_POLYNOMIAL_B}
            userValueParam={PARAMS_USER_VALUE_B}
            polynomialType={POLYNOMIAL_TYPE_B}
            identifier={`(${POLYNOMIAL_TYPE_B})`}
            onClick={() =>
              linearCalculations(
                searchParams,
                PARAMS_DEGREE_B,
                PARAMS_POLYNOMIAL_B,
                PARAMS_USER_VALUE_B,
                setStructureMatrixB,
                setConditionMatrixB,
                setPotentialPeriodLengthB,
                setFactualPeriodLengthB,
                setPseudorandomSequenceB,
                setHammingWeightB,
                setProductCorrelation,
              )
            }
          />
        </div>
        <div className="flex justify-center flex-col my-5">
          <PeriodInfo factualPeriodLength={periodLengthS} identifier={"(S)"} />
          <PeriodsCondition
            polynomialTypeFirst={POLYNOMIAL_TYPE_A}
            polynomialTypeSecond={POLYNOMIAL_TYPE_B}
            condition={conditionS}
          />
          <CoprimeCondition conditionS={conditionS} />
        </div>

        {conditionS === 1 && (
          <>
            <div className="flex justify-center items-center p-2.5 my-5">
              <GenButton
                onClick={() =>
                  additionAndMultiplicationCalculations(
                    pseudorandomSequenceA,
                    pseudorandomSequenceB,
                    periodLengthS,
                    setSumSequence,
                    setProductSequence,
                    setHammingWeightSum,
                    setHammingWeightProduct,
                    setSumCorrelation,
                    setProductCorrelation,
                  )
                }
              >
                Згенерувати послідовності суми та добутку
              </GenButton>
            </div>

            <label>Послідовність S (сум)</label>
            <Sequence dataArray={sumSequence} />
            <HammingWeight hammingWeight={hammingWeightSum} />

            <label>Послідовність P (добуток)</label>
            <Sequence dataArray={productSequence} />
            <HammingWeight hammingWeight={hammingWeightProduct} />

            <div className="flex justify-center items-center w-full h-full">
              <CorrelationChart
                data1={sumCorrelation}
                data2={productCorrelation}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default SumAndProductGeneratorPage;
