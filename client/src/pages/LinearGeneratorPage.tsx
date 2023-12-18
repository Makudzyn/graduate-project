import LinearInputBlock from "../components/LinearGenerator/LinearInputBlock.tsx";
import { useContext, useState } from "react";
import {
  fetchPolynomials,
  sendLinearGeneratorData,
} from "../http/polynomialsAPI.ts";
import { Context } from "../main.tsx";
import Matrix from "../components/Matrix.tsx";
import Button from "../components/Button.tsx";
import {
  calcLengthByFormula,
  createMatrixInitialArray,
  generateStructureMatrixA,
  polynomialDestructuring,
} from "../functions/generatorFunctions.ts";
import { observer } from "mobx-react-lite";
import Sequence from "../components/Sequence.tsx";
import Chart, { DataPoint } from "../components/Chart/Chart.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import SequenceType from "../components/SequenceType.tsx";
import HammingWeight from "../components/HammingWeight.tsx";
import usePolynomialsFetching from "../hooks/usePolynomialsFetching.ts";
import PlotlyChart from "../components/Chart/PlotlyChart.tsx";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;
  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [periodLengthByFormula, setPeriodLengthByFormula] = useState<number>(0);
  const [experimentalPeriodLength, setExperimentalPeriodLength] =
    useState<number>(0);
  const [pseudorandomSequence, setPseudorandomSequence] = useState<number[]>(
    [],
  );
  const [hammingWeight, setHammingWeight] = useState<number>(0);
  const [correlationObjectDots, setCorrelationObjectDots] = useState<
    DataPoint[]
  >([]);
  const [correlation, setCorrelation] = useState<number[]>([]);
  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

  async function linearCalculations() {
    const { degree, polynomial, userValue } =
      calculationInfoStore.allInputValues;

    const { polyIndex, polyBinary } = polynomialDestructuring(polynomial);
    const polynomialArr = polyBinary.split("").slice(1);

    const userValueArr = userValue.split("").map(Number);

    const lengthByFormula = calcLengthByFormula(degree, polyIndex);
    setPeriodLengthByFormula(lengthByFormula);

    const structureMatrix = generateStructureMatrixA(
      degree,
      createMatrixInitialArray(degree, polynomialArr),
    );
    setStructureMatrix(structureMatrix);

    try {
      const {
        experimentalPeriodLength,
        conditionMatrix,
        pseudorandomSequence,
        hammingWeight,
        correlation,
        correlationObjectDots,
      } = await sendLinearGeneratorData(
        degree,
        structureMatrix,
        userValueArr,
        lengthByFormula,
      );
      setExperimentalPeriodLength(experimentalPeriodLength);
      setConditionMatrix(conditionMatrix);
      setPseudorandomSequence(pseudorandomSequence);
      setHammingWeight(hammingWeight);
      setCorrelation(correlation)
      setCorrelationObjectDots(correlationObjectDots);
    } catch (error: any) {
      console.error("Error sending data to server:", error.message);
    }
  }

  return (
    <section className="flex h-full justify-center">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

        <div className="flex w-full justify-evenly pb-9 pt-2.5">
          <LinearInputBlock />
        </div>

        <div className={"flex justify-center items-center p-2.5 mb-5"}>
          <Button onClick={linearCalculations}>Розпочати генерацію</Button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div>
            <h3 className="text-center">Структурна матриця</h3>
            <Matrix dataArray={structureMatrix} />
          </div>
          <div>
            <h3 className="text-center">Послідовність станів регістру</h3>
            <Matrix dataArray={conditionMatrix} />
          </div>
        </div>

        <div className="my-5 flex justify-center">
          <div className="flex w-1/2 justify-between">
            <PeriodInfo
              periodLengthByFormula={periodLengthByFormula}
              experimentalPeriodLength={experimentalPeriodLength}
            />
            <SequenceType
              periodLengthByFormula={periodLengthByFormula}
              experimentalPeriodLength={experimentalPeriodLength}
            />
            <HammingWeight hammingWeight={hammingWeight} />
          </div>
        </div>

        <label>Згенерована послідовність</label>
        <Sequence dataArray={pseudorandomSequence} />

        <div className="flex justify-center items-center w-full h-full">
          <PlotlyChart data={correlation} />
        </div>

        {/*{correlationObjectDots[0] ? (*/}
        {/*  <Chart data={correlationObjectDots} />*/}
        {/*) : (*/}
        {/*  <div*/}
        {/*    className={*/}
        {/*      "w-full h-[600px] border-2 rounded-md mb-5 flex justify-center items-center text-3xl text-gray-500"*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Chart*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </section>
  );
});

export default LinearGeneratorPage;
