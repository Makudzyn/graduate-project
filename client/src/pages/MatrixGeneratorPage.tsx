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
import Chart, { DataPoint } from "../components/Chart/Chart.tsx";
import ConditionMatrixBlock from "../components/MatrixGenerator/ConditionMatrixBlock.tsx";
import StructureMatricesBlock from "../components/MatrixGenerator/StructureMatricesBlock.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import HammingWeight from "../components/HammingWeight.tsx";
import HammingWeightSpectre from "../components/HammingWeightSpectre.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import MatrixInputBlock from "../components/MatrixGenerator/MatrixInputBlock.tsx";

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

  const [periodLengthByFormulaA, setPeriodLengthByFormulaA] =
    useState<number>(0);
  const [periodLengthByFormulaB, setPeriodLengthByFormulaB] =
    useState<number>(0);
  const [periodLengthByFormulaS, setPeriodLengthByFormulaS] =
    useState<number>(0);
  const [experimentalPeriodLengthA, setExperimentalPeriodLengthA] =
    useState<number>(0);
  const [experimentalPeriodLengthB, setExperimentalPeriodLengthB] =
    useState<number>(0);

  const [conditionS, setConditionS] = useState<number>(0);

  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [hammingWeightSpectre, setHammingWeightSpectre] = useState<string[]>([
    "0",
  ]);

  const [correlationObjectDots, setCorrelationObjectDots] = useState<
    DataPoint[]
  >([]);

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

    const lengthByFormulaA = calcLengthByFormula(degreeA, polyIndexA);
    const lengthByFormulaB = calcLengthByFormula(degreeB, polyIndexB);
    const lengthByFormulaS = lengthByFormulaA * lengthByFormulaB;

    setPeriodLengthByFormulaA(lengthByFormulaA);
    setPeriodLengthByFormulaB(lengthByFormulaB);
    setPeriodLengthByFormulaS(lengthByFormulaS);

    // const experimentalPeriodLengthA = experimentalPeriodLengthCalc(
    //   structureMatrixA,
    //   degreeA,
    // );
    // const experimentalPeriodLengthB = experimentalPeriodLengthCalc(
    //   structureMatrixB,
    //   degreeB,
    // );

    setExperimentalPeriodLengthA(lengthByFormulaA);
    setExperimentalPeriodLengthB(lengthByFormulaB);

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

    const condition = findGCD(lengthByFormulaA, lengthByFormulaB);
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
        correlationObjectDots,
      } = await sendMatrixGeneratorData(
        structureMatrixA,
        structureMatrixB,
        basisMatrix,
        lengthByFormulaS,
        indexI,
        indexJ,
      );

      setConditionMatrix(conditionMatrix);
      setPseudorandomSequence(pseudorandomSequence);
      setHammingWeight(hammingWeight);
      setCorrelationObjectDots(correlationObjectDots);
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

        <div className="my-5 gap-3 flex justify-center items-center">
          <PeriodInfo
            periodLengthByFormula={periodLengthByFormulaA}
            experimentalPeriodLength={experimentalPeriodLengthA}
            identifier={"T(A)"}
          />
          <PeriodInfo
            periodLengthByFormula={periodLengthByFormulaB}
            experimentalPeriodLength={experimentalPeriodLengthB}
            identifier={"T(B)"}
          />
        </div>

        <div className="my-5 flex justify-center">
          <div className="flex flex-col w-3/4 h-[400px] justify-evenly items-center">
            <h3 className="text-center">Матриці S[1..N]</h3>
            <ConditionMatrixBlock
              conditionMatrix={conditionMatrix}
              periodLength={periodLengthByFormulaA}
            />
            <PeriodInfo
              periodLengthByFormula={periodLengthByFormulaS}
              experimentalPeriodLength={periodLengthByFormulaS}
              identifier={"T(S)"}
            />
            <h5>Умова (T(A), T(B)) = {conditionS}</h5>
          </div>
        </div>

        <div className={"w-full flex flex-col"}>
          <label>Згенерована послідовність</label>
          <Sequence dataArray={pseudorandomSequence} />
          <HammingWeight hammingWeight={hammingWeight} />
          <HammingWeightSpectre hammingWeightSpectre={hammingWeightSpectre} />
        </div>

        {correlationObjectDots[0] ? (
          <Chart data={correlationObjectDots} />
        ) : (
          <div
            className={
              "w-full h-[600px] border-2 rounded-md mb-5 flex justify-center items-center text-3xl text-gray-500"
            }
          >
            Chart
          </div>
        )}
      </div>
    </section>
  );
});

export default MatrixGeneratorPage;
