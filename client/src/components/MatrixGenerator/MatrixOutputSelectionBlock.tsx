import { SetURLSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSelectedParam } from "../../functions/functions.ts";
import { calculatePossibleValues } from "../../functions/generatorFunctions.ts";
import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";

interface MatrixOutputSelectProps {
  firstOutputElementLabel: string;
  firstShownPlaceholder: string;
  firstUrlParamName: string;
  degreeParamA: string;
  secondOutputElementLabel: string;
  secondShownPlaceholder: string;
  secondUrlParamName: string;
  degreeParamB: string;
  thirdOutputElementLabel: string;
  thirdShownPlaceholder: string;
  thirdUrlParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const MatrixOutputSelectionBlock = ({
  firstOutputElementLabel,
  firstShownPlaceholder,
  firstUrlParamName,
  degreeParamA,
  secondOutputElementLabel,
  secondShownPlaceholder,
  secondUrlParamName,
  degreeParamB,
  thirdOutputElementLabel,
  thirdShownPlaceholder,
  thirdUrlParamName,
  searchParams,
  setSearchParams,
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

  return (
    <div className="flex items-center justify-center px-3 w-[25rem]">
      <div className="flex flex-col flex-wrap w-[15rem]">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={firstUrlParamName}
          optionsArray={indexesArrayI}
          shownPlaceholder={firstShownPlaceholder}
          selectLabel={firstOutputElementLabel}
        />

        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={secondUrlParamName}
          optionsArray={indexesArrayJ}
          shownPlaceholder={secondShownPlaceholder}
          selectLabel={secondOutputElementLabel}
        />

        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={thirdUrlParamName}
          optionsArray={matrixRanks}
          shownPlaceholder={thirdShownPlaceholder}
          selectLabel={thirdOutputElementLabel}
        />
      </div>
    </div>
  );
};

export default MatrixOutputSelectionBlock;
