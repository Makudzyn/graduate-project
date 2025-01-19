import { SetURLSearchParams } from 'react-router-dom';
import FrobeniusInputBlock from './FrobeniusInputBlock.tsx';
import GenButton from '../CommonGenComponents/GenButton.tsx';
import DecomposedPolynomialsBlock from './DecomposedPolynomialsBlock.tsx';
import OutputIndexes from './OutputIndexes.tsx';
import { useEffect, useState } from 'react';
import { getSelectedParam } from '../../functions/functions.ts';
import FrobeniusMatricesBlock from '../LinearGenerator/FrobeniusMatricesBlock.tsx';
import { PolynomialType } from '../../utils/interfacesAndTypes.ts';
import PeriodInfo from '../CommonGenComponents/PeriodInfo.tsx';
import Header3 from '../PageComponents/Headers/Header3.tsx';
import ConditionMatrixBlock from '../MatrixGenerator/ConditionMatrixBlock.tsx';
import Sequence from '../CommonGenComponents/Sequence.tsx';
import HammingWeight from '../CommonGenComponents/HammingWeight.tsx';

interface FrobeniusGeneratorProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  structureMatrixA: number[][];
  structureMatrixB: number[][];
  basisMatrix: number[][];
  conditionMatrix: number[][];
  potentialPeriod: number;
  potentialPeriodS: number;
  factualPeriod: number;
  factualPeriodS: number;
  prSequence: number[];
  hammingWeight: number;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  indexParamI: string;
  indexParamJ: string;
  polynomialTypeA: PolynomialType;
  polynomialTypeB: PolynomialType;
  identifierS: string;
  onClick: () => void;
}

const FrobeniusGenerator = ({
  searchParams,
  setSearchParams,
  structureMatrixA,
  structureMatrixB,
  basisMatrix,
  conditionMatrix,
  potentialPeriod,
  potentialPeriodS,
  factualPeriod,
  factualPeriodS,
  prSequence,
  hammingWeight,
  degreeParam,
  polynomialParam,
  userValueParam,
  indexParamI,
  indexParamJ,
  polynomialTypeA,
  polynomialTypeB,
  identifierS,
  onClick,
}: FrobeniusGeneratorProps) => {
  const [decompositionValues, setDecompositionValues] = useState<number[]>([]);

  useEffect(() => {
    const decomposition = getSelectedParam(userValueParam, searchParams);
    if (decomposition !== null) {
      const values = decomposition.split('-').map(Number);
      setDecompositionValues(values);
    }
  }, [location.search]);

  return (
    <>
      <div className="flex flex-col w-full items-center justify-evenly pb-9 pt-2.5">
        <FrobeniusInputBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          degreeParam={degreeParam}
          polynomialParam={polynomialParam}
          userValueParam={userValueParam}
        />
        <DecomposedPolynomialsBlock
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          decompositionValues={decompositionValues}
        />
        <OutputIndexes
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          indexParamI={indexParamI}
          indexParamJ={indexParamJ}
          degreeParam={degreeParam}
          decompositionValues={decompositionValues}
        />
      </div>

      <div className="mb-8 flex items-center justify-center p-2.5">
        <GenButton onClick={onClick}>Розпочати генерацію</GenButton>
      </div>

      <FrobeniusMatricesBlock
        structureMatrixA={structureMatrixA}
        structureMatrixB={structureMatrixB}
        basisMatrix={basisMatrix}
        polynomialTypeA={polynomialTypeA}
        polynomialTypeB={polynomialTypeB}
        identifierS={identifierS}
      />

      <div className="my-5 flex w-full justify-evenly gap-2">
        <PeriodInfo
          potentialPeriodLength={potentialPeriod}
          factualPeriodLength={factualPeriod}
          identifier={`(${polynomialTypeA}, B)`}
        />
      </div>

      <div className="mt-5 flex flex-col items-center justify-center mb-2.5">
        <div className="flex flex-col items-center w-[85.203rem]">
          <Header3>Матриці {identifierS}[1..N]</Header3>
          <ConditionMatrixBlock
            conditionMatrix={conditionMatrix}
            basisMatrix={basisMatrix}
          />
        </div>
      </div>

      <div className="mt-3 mb-6 flex w-full justify-center h-[6.875rem]">
        <div className="flex w-full flex-col justify-between">
          <PeriodInfo
            potentialPeriodLength={potentialPeriodS}
            factualPeriodLength={factualPeriodS}
            identifier={`(${identifierS})`}
          />
        </div>
      </div>

      <div className="flex w-full flex-col py-2 px-3">
        <Header3 align="left">Згенерована послідовність</Header3>
        <Sequence dataArray={prSequence} />
        <HammingWeight hammingWeight={hammingWeight} />
      </div>
    </>
  );
};

export default FrobeniusGenerator;
