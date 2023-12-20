import { observer } from "mobx-react-lite";
import {
  PARAMS_DEGREE_A,
  PARAMS_DEGREE_B,
  PARAMS_POLYNOMIAL_A,
  PARAMS_POLYNOMIAL_B,
  PARAMS_USER_VALUE_A,
  PARAMS_USER_VALUE_B,
} from "../utils/consts.ts";
import { useSearchParams } from "react-router-dom";
import LinearInputBlock from "../components/LinearGenerator/LinearInputBlock.tsx";
import Button from "../components/Button.tsx";
import {
  calcLengthByFormula,
  createMatrixInitialArray,
  findGCD,
  generateStructureMatrixA,
  generateStructureMatrixB,
  polynomialDestructuring,
} from "../functions/generatorFunctions.ts";
import {
  fetchPolynomials,
  sendLinearGeneratorData,
} from "../http/polynomialsAPI.ts";
import Matrix from "../components/Matrix.tsx";
import { useContext, useState } from "react";
import { Context } from "../main.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import PeriodInfo from "../components/PeriodInfo.tsx";
import SequenceType from "../components/SequenceType.tsx";
import HammingWeight from "../components/HammingWeight.tsx";
import Sequence from "../components/Sequence.tsx";

const SumAndMultiGeneratorPage = observer(() => {
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
  const [hammingWeightS, setHammingWeightS] = useState<number>(0);
  const [hammingWeightC, setHammingWeightC] = useState<number>(0);

  const [pseudorandomSequenceA, setPseudorandomSequenceA] = useState<number[]>(
    [],
  );
  const [pseudorandomSequenceB, setPseudorandomSequenceB] = useState<number[]>(
    [],
  );
  const [sumSequence, setSumSequence] = useState<number[]>([]);
  const [multiplicationSequence, setMultiplicationSequence] = useState<
    number[]
  >([]);

  const [searchParams, setSearchParams] = useSearchParams({
    degree_a: "2",
    polynomial_a: "1 7 H",
    value_a: "01",
    degree_b: "2",
    polynomial_b: "1 7 H",
    value_b: "01",
  });

  async function sumAndMultiCalculations() {
    const {
      degreeA,
      polynomialA,
      userValueA,
      degreeB,
      polynomialB,
      userValueB,
    } = calculationInfoStore.allInputValues;

    const { polyIndex: polyIndexA, polyBinary: polyBinaryA } =
      polynomialDestructuring(polynomialA);
    const { polyIndex: polyIndexB, polyBinary: polyBinaryB } =
      polynomialDestructuring(polynomialB);

    const polynomialArrA = polyBinaryA.split("").slice(1);
    const polynomialArrB = polyBinaryB.split("").slice(1);

    const userValueArrA = userValueA.split("").map(Number);
    const userValueArrB = userValueB.split("").map(Number);

    const potentialPeriodLengthA = Math.pow(2, degreeA) - 1;
    const potentialPeriodLengthB = Math.pow(2, degreeB) - 1;
    setPotentialPeriodLengthA(potentialPeriodLengthA);
    setPotentialPeriodLengthB(potentialPeriodLengthB);

    const periodLengthA = calcLengthByFormula(degreeA, polyIndexA);
    const periodLengthB = calcLengthByFormula(degreeB, polyIndexB);
    const periodLengthS = periodLengthA * periodLengthB;

    setFactualPeriodLengthA(periodLengthA);
    setFactualPeriodLengthB(periodLengthB);
    setPeriodLengthS(periodLengthS);

    const structureMatrixA = generateStructureMatrixA(
      degreeA,
      createMatrixInitialArray(degreeA, polynomialArrA),
    );

    const structureMatrixB = generateStructureMatrixB(
      degreeB,
      createMatrixInitialArray(degreeB, polynomialArrB),
    );

    setStructureMatrixA(structureMatrixA);
    setStructureMatrixB(structureMatrixB);

    const condition = findGCD(periodLengthA, periodLengthB);
    setConditionS(condition);

    try {
      const {
        conditionMatrix,
        pseudorandomSequence,
        hammingWeight,
        correlation,
      } = await sendLinearGeneratorData(
        structureMatrix,
        userValueArr,
        periodLengthA,
      );
      setConditionMatrix(conditionMatrix);
      setPseudorandomSequence(pseudorandomSequence);
      setHammingWeight(hammingWeight);
      setCorrelation(correlation);
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

        <div className="flex w-full justify-evenly pb-9 pt-2.5">
          <LinearInputBlock
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            degreeConst={PARAMS_DEGREE_A}
            polynomialConst={PARAMS_POLYNOMIAL_A}
            userValueConst={PARAMS_USER_VALUE_A}
            polynomialType={"A"}
          />
          <LinearInputBlock
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            degreeConst={PARAMS_DEGREE_B}
            polynomialConst={PARAMS_POLYNOMIAL_B}
            userValueConst={PARAMS_USER_VALUE_B}
            polynomialType={"B"}
          />
        </div>

        <div className={"flex justify-center items-center p-2.5 mb-5"}>
          <Button onClick={sumAndMultiCalculations}>Розпочати генерацію</Button>
        </div>

        <div className="flex items-center justify-evenly gap-2">
          <div>
            <div>
              <h3 className="text-center">Структурна матриця A</h3>
              <Matrix dataArray={structureMatrixA} />
            </div>
            <div>
              <h3 className="text-center">Послідовність станів регістру A</h3>
              <Matrix dataArray={conditionMatrixA} />
            </div>
          </div>
          <div>
            <div>
              <h3 className="text-center">Структурна матриця B</h3>
              <Matrix dataArray={structureMatrixB} />
            </div>
            <div>
              <h3 className="text-center">Послідовність станів регістру B</h3>
              <Matrix dataArray={conditionMatrixB} />
            </div>
          </div>
        </div>

        <div className="my-5 flex justify-evenly items-center">
          <div className="flex flex-col w-[400px] text-center justify-center">
            <PeriodInfo
              potentialPeriodLength={potentialPeriodLengthA}
              factualPeriodLength={factualPeriodLengthA}
            />
            <SequenceType
              periodLengthByFormula={factualPeriodLengthA}
              potentialPeriodLength={potentialPeriodLengthA}
            />
          </div>
          <div className="flex flex-col w-[400px] text-center justify-center">
            <PeriodInfo
              potentialPeriodLength={potentialPeriodLengthB}
              factualPeriodLength={factualPeriodLengthB}
            />
            <SequenceType
              periodLengthByFormula={factualPeriodLengthB}
              potentialPeriodLength={potentialPeriodLengthB}
            />
          </div>
        </div>

        <div className="my-5 flex justify-evenly items-center">
          <div className="flex flex-col w-[500px] text-center justify-center">
            <label>Згенерована послідовність A</label>
            <Sequence dataArray={pseudorandomSequenceA} />
            <HammingWeight hammingWeight={hammingWeightA} />
          </div>
          <div className="flex flex-col w-[500px] text-center justify-center">
            <label>Згенерована послідовність B</label>
            <Sequence dataArray={pseudorandomSequenceB} />
            <HammingWeight hammingWeight={hammingWeightB} />
          </div>
        </div>

        <label>Послідовність S (сум)</label>
        <Sequence dataArray={sumSequence} />
        <HammingWeight hammingWeight={hammingWeightS} />

        <label>Послідовність C (добуток)</label>
        <Sequence dataArray={multiplicationSequence} />
        <HammingWeight hammingWeight={hammingWeightC} />

        {/*  <div className="flex justify-center items-center w-full h-full">*/}
        {/*    <PlotlyChart data={correlation}/>*/}
        {/*  </div>*/}
      </div>
    </section>
  );
});

export default SumAndMultiGeneratorPage;
