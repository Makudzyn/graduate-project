import { SetURLSearchParams } from 'react-router-dom';
import LinearInputBlock from './LinearInputBlock.tsx';
import GenButton from '../CommonGenComponents/GenButton.tsx';
import { PolynomialType } from '../../utils/interfacesAndTypes.ts';
import PeriodInfo from '../CommonGenComponents/PeriodInfo.tsx';
import SequenceType from '../CommonGenComponents/SequenceType.tsx';
import Sequence from '../CommonGenComponents/Sequence.tsx';
import HammingWeight from '../CommonGenComponents/HammingWeight.tsx';
import LinearMatricesBlock from './LinearMatricesBlock.tsx';
import Header3 from '../PageComponents/Headers/Header3.tsx';

interface LinearGeneratorProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  structureMatrix: number[][];
  conditionMatrix: number[][];
  potentialPeriod: number;
  factualPeriod: number;
  prSequence: number[];
  hammingWeight: number;
  onClick: () => void;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  polynomialType?: PolynomialType;
  className?: string;
  identifier?: string;
}

const LinearGenerator = ({
  searchParams,
  setSearchParams,
  structureMatrix,
  conditionMatrix,
  potentialPeriod,
  factualPeriod,
  prSequence,
  hammingWeight,
  degreeParam,
  polynomialParam,
  userValueParam,
  polynomialType,
  identifier,
  className,
  onClick,
}: LinearGeneratorProps) => {
  return (
    <div className={className}>
      <div className="flex w-full justify-evenly pb-9 pt-2.5">
        <LinearInputBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParam={degreeParam}
          polynomialParam={polynomialParam}
          userValueParam={userValueParam}
          polynomialType={polynomialType}
        />
      </div>

      <div className="mb-8 flex items-center justify-center p-2.5">
        <GenButton onClick={onClick}>Розпочати генерацію</GenButton>
      </div>

      <LinearMatricesBlock
        polynomialType={polynomialType}
        structureMatrix={structureMatrix}
        conditionMatrix={conditionMatrix}
      />

      <div className="mt-3 mb-6 flex w-full justify-center h-[6.875rem]">
        <div className="flex flex-col justify-between w-full">
          <PeriodInfo
            potentialPeriodLength={potentialPeriod}
            factualPeriodLength={factualPeriod}
            identifier={identifier}
          />
          <SequenceType
            periodLengthByFormula={factualPeriod}
            potentialPeriodLength={potentialPeriod}
          />
        </div>
      </div>

      <div className="flex w-full flex-col py-2 px-3">
        <Header3 align="left">
          Згенерована послідовність {polynomialType}
        </Header3>
        <Sequence dataArray={prSequence} />
        <HammingWeight hammingWeight={hammingWeight} />
      </div>
    </div>
  );
};

export default LinearGenerator;
