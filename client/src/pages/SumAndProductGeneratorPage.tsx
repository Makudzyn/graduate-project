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
import {
  findGCD,
  linearCalculations,
} from "../functions/generatorFunctions.ts";
import {
  fetchPolynomials,
  sendSumAndProductGeneratorData,
} from "../http/polynomialsAPI.ts";
import { useContext, useState } from "react";
import { Context } from "../main.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import HammingWeight from "../components/HammingWeight.tsx";
import Sequence from "../components/Sequence.tsx";
import LinearGenerator from "../components/LinearGenerator/LinearGenerator.tsx";
import Button from "../components/Button.tsx";

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

  async function additionAndMultiplicationCalculations() {
    const periodLengthS = factualPeriodLengthA * factualPeriodLengthB;
    setPeriodLengthS(periodLengthS);

    const condition = findGCD(factualPeriodLengthA, factualPeriodLengthB);
    setConditionS(condition);

    try {
      const {
        sumSequence,
        multiplicationSequence,
        hammingWeightS,
        hammingWeightC,
        sumCorrelation,
        productCorrelation,
      } = await sendSumAndProductGeneratorData(
        pseudorandomSequenceA,
        pseudorandomSequenceB,
        periodLengthS,
      );
      setSumSequence(sumSequence);
      setProductSequence(multiplicationSequence);
      setHammingWeightSum(hammingWeightS);
      setHammingWeightProduct(hammingWeightC);
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
        <div>Умова Н.С.Д.(T(A), T(B)) = {conditionS}</div>
        {conditionS === 1 && (
          <>
            <Button onClick={additionAndMultiplicationCalculations}>
              Розрахуваити суму та добуток
            </Button>

            <label>Послідовність S (сум)</label>
            <Sequence dataArray={sumSequence} />
            <HammingWeight hammingWeight={hammingWeightSum} />

            <label>Послідовність P (добуток)</label>
            <Sequence dataArray={productSequence} />
            <HammingWeight hammingWeight={hammingWeightProduct} />

            {/*  <div className="flex justify-center items-center w-full h-full">*/}
            {/*    <PlotlyChart data={correlation}/>*/}
            {/*  </div>*/}
          </>
        )}
      </div>
    </section>
  );
});

export default SumAndProductGeneratorPage;
