import InputBlock from "../components/LinearGenComponents/InputBlock.tsx";
import { useContext, useEffect, useState } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import { Context } from "../main.tsx";
import Matrix from "../components/Matrix.tsx";
import Button from "../components/Button.tsx";
import {
  createMatrix,
  linearFeedbackShiftRegister,
  createMatrixRow,
  experimentalPeriodLengthCalc,
  calcLengthByFormula,
  getPrsSequence,
  hammingWeightCalc,
} from "../functions/generatorFunctions.ts";
import { observer } from "mobx-react-lite";
import Sequence from "../components/Sequence.tsx";

const LinearGeneratorPage = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;
  const [structureMatrix, setStructureMatrix] = useState<number[][]>([]);
  const [conditionMatrix, setConditionMatrix] = useState<number[][]>([]);

  const [periodLengthByFormula, setPeriodLengthByFormula] = useState<number>(0);
  const [experimentalPeriodLength, setExperimentalPeriodLength] =
    useState<number>(0);
  const [prsSequence, setPrsSequence] = useState<number[]>([]);
  const [hammingWeight, setHammingWeight] = useState<number>(0);
  useEffect(() => {
    fetchPolynomials().then((data) => polynomialsStore.setPolynomials(data));
  }, []);

  function calculations() {
    const { degree, polynomial, userValue } =
      calculationInfoStore.allInputValues;

    const degreeNum = Number(degree);
    const polynomialArr = polynomial.split("").slice(1);
    const userValueArr = userValue.split("").map(Number);
    const lengthByFormula = calcLengthByFormula(degreeNum);
    
    const structureMatrix = 
      createMatrix(degreeNum, createMatrixRow(degreeNum, polynomialArr));
    
    const conditionMatrix = 
      linearFeedbackShiftRegister(lengthByFormula, userValueArr, structureMatrix);
    
    const pseudorandomSequence = getPrsSequence(conditionMatrix);
    const hammingWeight = hammingWeightCalc(pseudorandomSequence);

    setPeriodLengthByFormula(lengthByFormula);
    setExperimentalPeriodLength(
      experimentalPeriodLengthCalc(degreeNum, structureMatrix),
    );
    setStructureMatrix(structureMatrix);
    setConditionMatrix(conditionMatrix);
    setPrsSequence(pseudorandomSequence);
    setHammingWeight(hammingWeight);
  }

  return (
    <section className="flex h-full justify-center">
      <div className="h-full w-[calc(100%-2rem)] flex flex-col justify-center ">
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
          <div className="flex w-3/4 justify-between">
            <h5>Період по формулі T = {periodLengthByFormula}</h5>
            <h5>Експериментальний період T = {experimentalPeriodLength}</h5>
            <h5>
              Вид послідовності ={" "}
              {periodLengthByFormula === experimentalPeriodLength ? "M" : "C"}
              -послідовність
            </h5>
            <h5>Вага Хеммінгу = {hammingWeight}</h5>
          </div>
        </div>

        <label>Згенерована послідовність</label>
        <Sequence dataArray={prsSequence}/>

        <canvas></canvas>
      </div>
    </section>
  );
});

export default LinearGeneratorPage;
