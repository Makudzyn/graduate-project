import { SetURLSearchParams } from "react-router-dom";
import { PolynomialType } from "../utils/interfacesAndTypes.ts";
import MatrixInputBlock from "./MatrixGenerator/MatrixInputBlock.tsx";
import Button from "./Button.tsx";
import StructureMatricesBlock from "./MatrixGenerator/StructureMatricesBlock.tsx";
import PeriodInfo from "./PeriodInfo.tsx";
import ConditionMatrixBlock from "./MatrixGenerator/ConditionMatrixBlock.tsx";
import PeriodsCondition from "./PeriodsCondition.tsx";
import Sequence from "./Sequence.tsx";
import HammingWeight from "./HammingWeight.tsx";
import HammingWeightSpectre from "./HammingWeightSpectre.tsx";

interface MatrixGeneratorProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  structureMatrixA: number[][];
  structureMatrixB: number[][];
  basisMatrix: number[][];
  conditionMatrix: number[][];
  potentialPeriodLengthA: number;
  potentialPeriodLengthB: number;
  factualPeriodLengthA: number;
  factualPeriodLengthB: number;
  periodLengthS: number;
  conditionS: number;
  identifierS: string;
  pseudorandomSequence: number[];
  hammingWeight: number;
  hammingWeightSpectre: string[];
  onClick: () => Promise<void>;
  degreeParamA: string;
  degreeParamB: string;
  polynomialParamA: string;
  polynomialParamB: string;
  indexParamI: string;
  indexParamJ: string;
  matrixRankParam: string;
  polynomialTypeA?: PolynomialType;
  polynomialTypeB?: PolynomialType;
}

const MatrixGenerator = ({
  searchParams,
  setSearchParams,
  conditionMatrix,
  degreeParamA,
  degreeParamB,
  polynomialParamA,
  polynomialParamB,
  polynomialTypeA,
  polynomialTypeB,
  indexParamJ,
  indexParamI,
  conditionS,
  identifierS,
  matrixRankParam,
  structureMatrixB,
  basisMatrix,
  structureMatrixA,
  onClick,
  pseudorandomSequence,
  hammingWeight,
  hammingWeightSpectre,
  factualPeriodLengthA,
  potentialPeriodLengthA,
  potentialPeriodLengthB,
  periodLengthS,
  factualPeriodLengthB,
}: MatrixGeneratorProps) => {
  return (
    <div>
      <div className="flex w-full justify-evenly pb-9 pt-2.5">
        <MatrixInputBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParamA={degreeParamA}
          degreeParamB={degreeParamB}
          polynomialParamA={polynomialParamA}
          polynomialParamB={polynomialParamB}
          indexParamI={indexParamI}
          indexParamJ={indexParamJ}
          matrixRankParam={matrixRankParam}
          polynomialTypeA={polynomialTypeA}
          polynomialTypeB={polynomialTypeB}
        />
      </div>

      <div className="mb-5 flex items-center justify-center p-2.5">
        <Button onClick={onClick}>Розпочати генерацію</Button>
      </div>

      <StructureMatricesBlock
        structureMatrixA={structureMatrixA}
        structureMatrixB={structureMatrixB}
        basisMatrix={basisMatrix}
      />

      <div className="my-5 flex w-full justify-evenly gap-2">
        <div className="w-[25rem]">
          <PeriodInfo
            potentialPeriodLength={potentialPeriodLengthA}
            factualPeriodLength={factualPeriodLengthA}
            identifier={`(${polynomialTypeA})`}
          />
        </div>
        <div className="w-[25rem]">
          <PeriodsCondition
            polynomialTypeFirst={polynomialTypeA}
            polynomialTypeSecond={polynomialTypeB}
            condition={conditionS}
          />
        </div>
        <div className="w-[25rem]">
          <PeriodInfo
            potentialPeriodLength={potentialPeriodLengthB}
            factualPeriodLength={factualPeriodLengthB}
            identifier={`(${polynomialTypeB})`}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-center mb-2.5">
        <div className="flex flex-col items-center w-[85.203rem] h-[400px]">
          <h3 className="text-center">Матриці {identifierS}[1..N]</h3>
          <ConditionMatrixBlock
            conditionMatrix={conditionMatrix}
            periodLength={potentialPeriodLengthA}
          />
          <div className="my-5 flex w-full justify-center">
            <div className="flex w-full flex-col justify-between h-[5.625rem]">
              <PeriodInfo
                factualPeriodLength={periodLengthS}
                identifier={`(${identifierS})`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col p-2">
        <label>Згенерована послідовність</label>
        <Sequence dataArray={pseudorandomSequence} />
        <HammingWeight hammingWeight={hammingWeight} />
        <HammingWeightSpectre hammingWeightSpectre={hammingWeightSpectre} />
      </div>
    </div>
  );
};

export default MatrixGenerator;
