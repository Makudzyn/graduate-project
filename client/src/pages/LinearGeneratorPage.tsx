import InputBlock from "../components/LinearGenerator/InputBlock.tsx";
import { useContext, useEffect, useState } from "react";
import {
  fetchPolynomials,
  sendLinearGeneratorData,
} from "../http/polynomialsAPI.ts";
import { Context } from "../main.tsx";
import Matrix from "../components/Matrix.tsx";
import Button from "../components/Button.tsx";
import {
  calcLengthByFormula,
  polynomialDestructuring,
} from "../functions/generatorFunctions.ts";
import { observer } from "mobx-react-lite";
import Sequence from "../components/Sequence.tsx";
import Chart, { DataPoint } from "../components/Chart/Chart.tsx";
import PeriodInfo from "../components/PeriodInfo.tsx";
import SequenceType from "../components/SequenceType.tsx";
import HammingWeight from "../components/HammingWeight.tsx";

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

  useEffect(() => {
    fetchPolynomials().then((data) => polynomialsStore.setPolynomials(data));
  }, []);

  async function calculations() {
    const { degreeA, polynomialA, userValue } =
      calculationInfoStore.allInputValues;

    const { polyIndex, polyBinary } = polynomialDestructuring(polynomialA);
    const polynomialArr = polyBinary.split("").slice(1);

    const userValueArr = userValue.split("").map(Number);
    const lengthByFormula = calcLengthByFormula(degreeA, polyIndex);
    setPeriodLengthByFormula(lengthByFormula);

    try {
      const {
        experimentalPeriodLength,
        structureMatrix,
        conditionMatrix,
        pseudorandomSequence,
        hammingWeight,
        correlationObjectDots,
      } = await sendLinearGeneratorData(
        degreeA,
        polynomialArr,
        userValueArr,
        lengthByFormula,
      );
      setExperimentalPeriodLength(experimentalPeriodLength);
      setStructureMatrix(structureMatrix);
      setConditionMatrix(conditionMatrix);
      setPseudorandomSequence(pseudorandomSequence);
      setHammingWeight(hammingWeight);
      setCorrelationObjectDots(correlationObjectDots);
    } catch (error: any) {
      console.error("Ошибка отправки данных на сервер:", error.message);
    }

    // const structureMatrix = generateStructureMatrixA(
    //   degreeA,
    //   createMatrixInitialArray(degreeA, polynomialArr),
    // );
    //
    // const conditionMatrix = linearFeedbackShiftRegister(
    //   lengthByFormula,
    //   userValueArr,
    //   structureMatrix,
    // );
    //
    // const pseudorandomSequence = getPrsSequence(conditionMatrix);
    // const hammingWeight = hammingWeightCalc(pseudorandomSequence);

    // try {
    //   const correlationArr = await sendGeneratedSequence(pseudorandomSequence);
    //   const correlationObjectDots = transformArrayToObjects(correlationArr);
    //   setCorrelationObjectDots(correlationObjectDots);
    // } catch (error: any) {
    //   console.error('Ошибка отправки данных на сервер:', error.message);
    // }
  }

  return (
    <section className="flex h-full justify-center">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center">
        <h1 className="py-5 text-center">Лінійний ЗРЗЗ</h1>

        <div className="flex w-full justify-evenly pb-9 pt-2.5">
          <InputBlock />
        </div>

        <div className={"flex justify-center items-center p-2.5 mb-5"}>
          <Button onClick={calculations}>Розпочати генерацію</Button>
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

export default LinearGeneratorPage;
