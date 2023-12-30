import { useContext, useState } from "react";
import {
  fetchPolynomials,
  sendMatrixGeneratorData,
} from "../http/polynomialsAPI.ts";
import { observer } from "mobx-react-lite";
import { Context } from "../main.tsx";
import {
  calcLengthByFormula,
  formatHammingWeight,
  calcHammingWeightSpectre,
  polynomialDestructuring,
  findGCD,
  generateStructureMatrixA,
  createMatrixInitialArray,
  generateStructureMatrixB,
  generateMatrixBasis,
} from "../functions/generatorFunctions.ts";
import Button from "../components/Button.tsx";
import Sequence from "../components/Sequence.tsx";
import ConditionMatrixBlock from "../components/MatrixGenerator/ConditionMatrixBlock.tsx";
import StructureMatricesBlock from "../components/MatrixGenerator/StructureMatricesBlock.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import HammingWeight from "../components/HammingWeight.tsx";
import HammingWeightSpectre from "../components/HammingWeightSpectre.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import MatrixInputBlock from "../components/MatrixGenerator/MatrixInputBlock.tsx";
import PlotlyChart from "../components/Chart/Plotly/PlotlyChart.tsx";
import { POLYNOMIAL_TYPE_A, POLYNOMIAL_TYPE_B } from "../utils/consts.ts";
import PeriodsCondition from "../components/PeriodsCondition.tsx";

const MatrixGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

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

  async function matrixCalculations() {
    const {
      degreeA,
      polynomialA,
      degreeB,
      polynomialB,
      indexI,
      indexJ,
      matrixRank,
    } = calculationInfoStore.allInputValues;

    const { polyIndex: polyIndexA, polyBinary: polyBinaryA } =
      polynomialDestructuring(polynomialA);
    const { polyIndex: polyIndexB, polyBinary: polyBinaryB } =
      polynomialDestructuring(polynomialB);

    const polynomialArrA = polyBinaryA.split("").slice(1);
    const polynomialArrB = polyBinaryB.split("").slice(1);

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

    const basisMatrix = generateMatrixBasis(degreeA, degreeB, matrixRank);

    setStructureMatrixA(structureMatrixA);
    setStructureMatrixB(structureMatrixB);
    setBasisMatrix(basisMatrix);

    const condition = findGCD(periodLengthA, periodLengthB);
    setConditionS(condition);

    const hammingWeightSpectre = calcHammingWeightSpectre(
      matrixRank,
      degreeA,
      degreeB,
    );
    const formattedWeightSpectre = formatHammingWeight(hammingWeightSpectre);
    setHammingWeightSpectre(formattedWeightSpectre);

    try {
      const {
        conditionMatrix,
        pseudorandomSequence,
        hammingWeight,
        correlation,
      } = await sendMatrixGeneratorData(
        structureMatrixA,
        structureMatrixB,
        basisMatrix,
        periodLengthS,
        indexI,
        indexJ,
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
        <h1 className="py-5 text-center">Матрічний ЗРЗЗ (МРЗ)</h1>

        <div className="flex w-full justify-evenly pb-9 pt-2.5">
          <MatrixInputBlock />
        </div>

        <div className={"flex justify-center items-center p-2.5 mb-5"}>
          <Button onClick={matrixCalculations}>Розпочати генерацію</Button>
        </div>

        <StructureMatricesBlock
          structureMatrixA={structureMatrixA}
          structureMatrixB={structureMatrixB}
          basisMatrix={basisMatrix}
        />

        <div className="my-5 gap-3 flex justify-center items-center w-full">
          <PeriodInfo
            potentialPeriodLength={potentialPeriodLengthA}
            factualPeriodLength={factualPeriodLengthA}
            identifier={`(${POLYNOMIAL_TYPE_A})`}
          />
          <PeriodInfo
            potentialPeriodLength={potentialPeriodLengthB}
            factualPeriodLength={factualPeriodLengthB}
            identifier={`(${POLYNOMIAL_TYPE_B})`}
          />
        </div>

        <div className="my-5 flex justify-center">
          <div className="flex flex-col w-3/4 h-[400px] justify-evenly items-center">
            <h3 className="text-center">Матриці S[1..N]</h3>
            <ConditionMatrixBlock
              conditionMatrix={conditionMatrix}
              periodLength={potentialPeriodLengthA}
            />
            <PeriodInfo
              factualPeriodLength={periodLengthS}
              identifier={"(S)"}
            />
            <PeriodsCondition polynomialTypeFirst={POLYNOMIAL_TYPE_A} polynomialTypeSecond={POLYNOMIAL_TYPE_B} condition={conditionS} />

          </div>
        </div>

        <div className={"w-full flex flex-col"}>
          <label>Згенерована послідовність</label>
          <Sequence dataArray={pseudorandomSequence} />
          <HammingWeight hammingWeight={hammingWeight} />
          <HammingWeightSpectre hammingWeightSpectre={hammingWeightSpectre} />
        </div>

        <div className="flex justify-center items-center w-full h-full">
          <PlotlyChart data1={correlation} />
        </div>
      </div>
    </section>
  );
});

export default MatrixGeneratorPage;
