import { SetURLSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSelectedParam } from "../../functions/functions.ts";
import { calculatePossibleValues } from "../../functions/generatorFunctions.ts";
import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";

interface MatrixOutputSelectProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParamA: string;
  degreeParamB: string;
  indexParamI: string;
  indexParamJ: string;
  matrixRankParam: string;
  identifierS: string;
}

const MatrixOutputSelectionBlock = ({
  searchParams,
  setSearchParams,
  degreeParamA,
  degreeParamB,
  indexParamI,
  indexParamJ,
  matrixRankParam,
  identifierS,
}: MatrixOutputSelectProps) => {
  const [indexesArrayI, setIndexesArrayI] = useState<number[]>([]);
  const [indexesArrayJ, setIndexesArrayJ] = useState<number[]>([]);
  const [matrixRanks, setMatrixRanks] = useState<number[]>([]);

  useEffect(() => {
    const degreeA = Number(getSelectedParam(degreeParamA, searchParams));
    const degreeB = Number(getSelectedParam(degreeParamB, searchParams));

    const indexesI = calculatePossibleValues(degreeA);
    const indexesJ = calculatePossibleValues(degreeB);
    const minDegree = Math.min(degreeA, degreeB);
    const rankValues = calculatePossibleValues(minDegree, 1);

    setIndexesArrayI(indexesI);
    setIndexesArrayJ(indexesJ);
    setMatrixRanks(rankValues);
  }, [location.search]);

  const INDEX_I_LABEL = "Оберіть i вихідного елементу";
  const INDEX_I_PLACEHOLDER = `Значення i`;
  const INDEX_J_LABEL = "Оберіть j вихідного елементу";
  const INDEX_J_PLACEHOLDER = `Значення j`;
  const MATRIX_RANK_LABEL = `Оберіть ранг матриці ${identifierS}`;
  const MATRIX_RANK_PLACEHOLDER = `Ранг матриці ${identifierS}`;

  return (
    <div className="flex items-center justify-center px-3 w-[25rem]">
      <div className="flex flex-col flex-wrap w-[18rem]">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={indexParamI}
          optionsArray={indexesArrayI}
          selectLabel={INDEX_I_LABEL}
          shownPlaceholder={INDEX_I_PLACEHOLDER}
        />

        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={indexParamJ}
          optionsArray={indexesArrayJ}
          selectLabel={INDEX_J_LABEL}
          shownPlaceholder={INDEX_J_PLACEHOLDER}
        />

        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={matrixRankParam}
          optionsArray={matrixRanks}
          selectLabel={MATRIX_RANK_LABEL}
          shownPlaceholder={MATRIX_RANK_PLACEHOLDER}
        />
      </div>
    </div>
  );
};

export default MatrixOutputSelectionBlock;
