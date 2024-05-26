import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";
import { SetURLSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSelectedParam } from "../../functions/functions.ts";
import { calculatePossibleValues } from "../../functions/generatorFunctions.ts";

interface OutputIndexesProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  indexParamI: string;
  indexParamJ: string;
  degreeParam: string;
  decompositionValues: number[];
}

const OutputIndexes = ({
  searchParams,
  setSearchParams,
  degreeParam,
  indexParamI,
  indexParamJ,
  decompositionValues,
}: OutputIndexesProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [indexesArrayI, setIndexesArrayI] = useState<number[]>([]);
  const [indexesArrayJ, setIndexesArrayJ] = useState<number[]>([]);

  useEffect(() => {
    if (decompositionValues.length !== 0) {
      const degree = Number(getSelectedParam(degreeParam, searchParams));
      const indexes = calculatePossibleValues(degree);
      setIndexesArrayI(indexes);
      setIndexesArrayJ(indexes);
      setIsShown(true);
    } else setIsShown(false);
  }, [location.search]);

  const INDEX_I_LABEL = "Оберіть i вихідного елементу";
  const INDEX_I_PLACEHOLDER = `Значення i`;
  const INDEX_J_LABEL = "Оберіть j вихідного елементу";
  const INDEX_J_PLACEHOLDER = `Значення j`;

  return (
    isShown && (
      <div className="flex flex-row justify-between px-2 mt-4 w-[50rem]">
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
      </div>
    )
  );
};

export default OutputIndexes;
