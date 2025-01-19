import GenButton from '../GenButton.tsx';
import Header3 from '../../PageComponents/Headers/Header3.tsx';
import {
  fillZigZagMatrixWithArr,
  mergeSubArrays,
} from '../../../functions/generatorFunctions.ts';
import { useState } from 'react';
import { getSelectedParam } from '../../../functions/functions.ts';
import TorMatrix from '../Matrices/TorMatrix.tsx';

interface TorStatesProps {
  searchParams: URLSearchParams;
  degreeParamA: string;
  degreeParamB: string;
  factualPeriodA: number;
  factualPeriodB: number;
  conditionMatrix: number[][];
  basisMatrix: number[][];
}

const TorStates = ({
  searchParams,
  degreeParamA,
  degreeParamB,
  conditionMatrix,
  factualPeriodA,
  factualPeriodB,
  basisMatrix,
}: TorStatesProps) => {
  const [torMatrix, setTorMatrix] = useState<number[][][][]>([]);

  const handleTorStatesCreation = () => {
    const degreeA = Number(getSelectedParam(degreeParamA, searchParams) || '2');
    const degreeB = Number(getSelectedParam(degreeParamB, searchParams) || '3');
    if (degreeA && degreeB && conditionMatrix) {
      const concatMatrix = basisMatrix.concat(conditionMatrix);
      const unitedNestedArrays = mergeSubArrays(concatMatrix, degreeA);
      const completeMatrix = unitedNestedArrays.slice(0, -1);

      const matrix = fillZigZagMatrixWithArr(
        completeMatrix,
        factualPeriodA,
        factualPeriodB,
      );

      setTorMatrix(matrix);
    }
  };

  return (
    <div className="my-8 flex flex-col w-full items-center gap-2">
      <GenButton onClick={handleTorStatesCreation}>
        Побудувати тор станів
      </GenButton>
      {torMatrix.length !== 0 && (
        <div className="flex flex-col w-full">
          <Header3>Тор станів</Header3>
          <TorMatrix statesArray={torMatrix} />
        </div>
      )}
    </div>
  );
};

export default TorStates;
