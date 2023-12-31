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
import { linearCalculations } from "../functions/calculationRequestFunctions.ts";
import {
  fetchPolynomials,
  sendSumAndProductGeneratorData,
} from "../http/polynomialsAPI.ts";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import HammingWeight from "../components/HammingWeight.tsx";
import Sequence from "../components/Sequence.tsx";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import Button from "../components/Button.tsx";
import PeriodsCondition from "../components/PeriodsCondition.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import PlotlyChart from "../components/Chart/Plotly/PlotlyChart.tsx";
import CoprimeCondition from "../components/CoprimeCondition.tsx";

const SumAndProductGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

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

  const [searchParams, setSearchParams] = useSearchParams({
    degree_a: "2",
    polynomial_a: "1 7 H",
    value_a: "01",
    degree_b: "2",
    polynomial_b: "1 7 H",
    value_b: "01",
  });

  useEffect(() => {
    if (factualPeriodLengthA !== 0 && factualPeriodLengthB !== 0) {
      const periodLengthS = factualPeriodLengthA * factualPeriodLengthB;
      setPeriodLengthS(periodLengthS);
      const condition = findGCD(factualPeriodLengthA, factualPeriodLengthB);
      setConditionS(condition);
    }
  }, [factualPeriodLengthA, factualPeriodLengthB]);

  async function additionAndMultiplicationCalculations() {
    try {
      const {
        sumSequence,
        productSequence,
        hammingWeightSum,
        hammingWeightProduct,
        sumCorrelation,
        productCorrelation,
      } = await sendSumAndProductGeneratorData(
        pseudorandomSequenceA,
        pseudorandomSequenceB,
        periodLengthS,
      );
      setSumSequence(sumSequence);
      setProductSequence(productSequence);
      setHammingWeightSum(hammingWeightSum);
      setHammingWeightProduct(hammingWeightProduct);
      setSumCorrelation(sumCorrelation);
      setProductCorrelation(productCorrelation);
    } catch (error: any) {
      console.error("Error sending data to server:", error.message);
    }
  }

  return (
    <section className="flex h-full justify-center">
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
                calculationInfoStore,
                setStructureMatrixA,
                setConditionMatrixA,
                setPotentialPeriodLengthA,
                setFactualPeriodLengthA,
                setPseudorandomSequenceA,
                setHammingWeightA,
                setSumCorrelation,
                POLYNOMIAL_TYPE_A,
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
                calculationInfoStore,
                setStructureMatrixB,
                setConditionMatrixB,
                setPotentialPeriodLengthB,
                setFactualPeriodLengthB,
                setPseudorandomSequenceB,
                setHammingWeightB,
                setProductCorrelation,
                POLYNOMIAL_TYPE_B,
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
              <Button onClick={additionAndMultiplicationCalculations}>
                Згенерувати послідовності суми та добутку
              </Button>
            </div>

            <label>Послідовність S (сум)</label>
            <Sequence dataArray={sumSequence} />
            <HammingWeight hammingWeight={hammingWeightSum} />

            <label>Послідовність P (добуток)</label>
            <Sequence dataArray={productSequence} />
            <HammingWeight hammingWeight={hammingWeightProduct} />

            <div className="flex justify-center items-center w-full h-full">
              <PlotlyChart data1={sumCorrelation} data2={productCorrelation} />
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default SumAndProductGeneratorPage;
