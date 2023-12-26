import { SetURLSearchParams } from "react-router-dom";
import LinearInputBlock from "./LinearInputBlock.tsx";
import Button from "../Button.tsx";
import Matrix from "../Matrix.tsx";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import PeriodInfo from "../PeriodInfo.tsx";
import SequenceType from "../SequenceType.tsx";
import Sequence from "../Sequence.tsx";
import HammingWeight from "../HammingWeight.tsx";

interface LinearGeneratorProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  structureMatrix: number[][];
  conditionMatrix: number[][];
  potentialPeriodLength: number;
  factualPeriodLength: number;
  pseudorandomSequence: number[];
  hammingWeight: number;
  onClick: () => Promise<void>;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  polynomialType?: PolynomialType;
  identifier?: string;
}

const LinearGenerator = ({
  searchParams,
  setSearchParams,
  structureMatrix,
  conditionMatrix,
  potentialPeriodLength,
  factualPeriodLength,
  pseudorandomSequence,
  hammingWeight,
  degreeParam,
  polynomialParam,
  userValueParam,
  polynomialType,
  identifier,
  onClick,
}: LinearGeneratorProps) => {
  return (
    <div>
      <div className="flex w-full justify-evenly pb-9 pt-2.5">
        <LinearInputBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeConst={degreeParam}
          polynomialConst={polynomialParam}
          userValueConst={userValueParam}
          polynomialType={polynomialType}
        />
      </div>

      <div className={"flex justify-center items-center p-2.5 mb-5"}>
        <Button onClick={onClick}>Розпочати генерацію</Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div>
          <h3 className="text-center">Структурна матриця {polynomialType}</h3>
          <Matrix dataArray={structureMatrix} />
        </div>
        <div>
          <h3 className="text-center">
            Послідовність станів регістру {polynomialType}
          </h3>
          <Matrix dataArray={conditionMatrix} />
        </div>
      </div>

      <div className="my-5 flex justify-center w-full">
        <div className="flex flex-col w-[800px] h-25 justify-between">
          <PeriodInfo
            potentialPeriodLength={potentialPeriodLength}
            factualPeriodLength={factualPeriodLength}
            identifier={identifier}
          />
          <SequenceType
            periodLengthByFormula={factualPeriodLength}
            potentialPeriodLength={potentialPeriodLength}
          />
        </div>
      </div>

      <label>Згенерована послідовність {polynomialType}</label>
      <Sequence dataArray={pseudorandomSequence} />
      <HammingWeight hammingWeight={hammingWeight} />
    </div>
  );
};

export default LinearGenerator;
