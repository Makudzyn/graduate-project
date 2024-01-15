import { SetURLSearchParams } from "react-router-dom";
import LinearInputBlock from "./LinearInputBlock.tsx";
import Button from "../Button.tsx";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import PeriodInfo from "../PeriodInfo.tsx";
import SequenceType from "../SequenceType.tsx";
import Sequence from "../Sequence.tsx";
import HammingWeight from "../HammingWeight.tsx";
import LinearMatricesBlock from "./LinearMatricesBlock.tsx";

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
          firstSelectLabel={`Оберіть ступінь поліному ${polynomialType || ""}`}
          firstShownPlaceholder={`Ступінь поліному ${polynomialType || ""}`}
          secondSelectLabel={`Оберіть поліном ${polynomialType || ""}`}
          secondShownPlaceholder={`Поліном ${polynomialType || ""}`}
          inputLabel={`Введіть початковий стан ${polynomialType || ""}`}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParam={degreeParam}
          polynomialParam={polynomialParam}
          userValueParam={userValueParam}
          polynomialType={polynomialType}
        />
      </div>

      <div className="mb-5 flex items-center justify-center p-2.5">
        <Button onClick={onClick}>Розпочати генерацію</Button>
      </div>

      <LinearMatricesBlock
        polynomialType={polynomialType}
        structureMatrix={structureMatrix}
        conditionMatrix={conditionMatrix}
      />

      <div className="my-5 flex w-full justify-center">
        <div className="flex flex-col justify-between w-full h-[5.625rem]">
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

      <div className="flex w-full flex-col p-2">
        <label>Згенерована послідовність {polynomialType}</label>
        <Sequence dataArray={pseudorandomSequence} />
        <HammingWeight hammingWeight={hammingWeight} />
      </div>
    </div>
  );
};

export default LinearGenerator;
