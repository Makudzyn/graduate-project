import {
  fillZigZagMatrix,
  findClosestProductFactors,
} from '../../../functions/generatorFunctions.ts';
import { useEffect, useState } from 'react';
import { getSelectedParam } from '../../../functions/functions.ts';
import Header3 from '../../PageComponents/Headers/Header3.tsx';
import GenButton from '../GenButton.tsx';
import Matrix from '../Matrices/Matrix.tsx';

interface PrTableProps {
  searchParams: URLSearchParams;
  degreeParamA: string;
  factualPeriod: number;
  pseudorandomSequence: number[];
  degreeParamB?: string;
}

const PRTable = ({
  searchParams,
  degreeParamA,
  factualPeriod,
  pseudorandomSequence,
  degreeParamB,
}: PrTableProps) => {
  const [prtSizes, setPrtSizes] = useState<[number, number] | null>(null);
  const [prTableCondition, setPrTableCondition] = useState<boolean>(false);
  const [prMatrix, setPrMatrix] = useState<(number | null)[][]>([]);

  useEffect(() => {
    setPrTableCondition(false);
    setPrMatrix([]);
    if (factualPeriod !== 0) {
      const prtTmp = findClosestProductFactors(factualPeriod);
      const degreeA = Number(
        getSelectedParam(degreeParamA, searchParams) || '0',
      );
      let degreeSplit;
      if (degreeParamB) {
        const degreeB = Number(
          getSelectedParam(degreeParamB, searchParams) || '0',
        );
        degreeSplit = [degreeB, degreeA];
      } else {
        degreeSplit = findClosestProductFactors(degreeA);
      }

      if (prtTmp && degreeSplit) {
        const n1 = Math.pow(2, degreeSplit[1]) - 1;
        const n2 = factualPeriod / n1;
        if (n1 === prtTmp[0] && n2 === prtTmp[1]) {
          setPrTableCondition(true);
          setPrtSizes(prtTmp);
        }
      }
    }
  }, [factualPeriod, pseudorandomSequence]);

  const handlePRTableCreation = () => {
    if (prtSizes) {
      const matrix = fillZigZagMatrix(
        pseudorandomSequence,
        prtSizes[0],
        prtSizes[1],
      );
      setPrMatrix(matrix);
    }
  };

  return (
    <div className="my-8 flex flex-col w-full items-center gap-2">
      {prTableCondition && (
        <GenButton onClick={handlePRTableCreation}>
          Створити псевдовипадкову таблицю
        </GenButton>
      )}
      {prTableCondition && prMatrix && (
        <div className="flex flex-col">
          <Header3>Псевдовипадкова таблиця</Header3>
          <Matrix dataArray={prMatrix} />
        </div>
      )}
    </div>
  );
};

export default PRTable;
