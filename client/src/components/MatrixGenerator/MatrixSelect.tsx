import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import SelectCyclic from "../CommonGenComponents/Select/SelectCyclic.tsx";
import { useEffect, useState } from "react";
import { generateOptions, getSelectedParam } from "../../functions/functions.ts";
import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";
import SelectPolynomial from "../CommonGenComponents/Select/SelectPolynomial.tsx";

interface MatrixSelectProps {
  firstSelectLabel: string;
  firstShownPlaceholder: string;
  secondSelectLabel: string;
  secondShownPlaceholder: string;
  thirdSelectLabel: string;
  thirdShownPlaceholder: string;
  degreeParamName: string;
  polynomialParamName: string;
  cyclicPolyParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const MatrixSelect = observer(
  ({
    firstSelectLabel,
    firstShownPlaceholder,
    secondSelectLabel,
    secondShownPlaceholder,
    thirdSelectLabel,
    thirdShownPlaceholder,
    degreeParamName,
    polynomialParamName,
    cyclicPolyParamName,
    searchParams,
    setSearchParams,
  }: MatrixSelectProps) => {
    const [polyDegree, setPolyDegree] = useState<number>(0);
    const degreesArray = generateOptions();

    useEffect(() => {
      const degree = Number(getSelectedParam(degreeParamName, searchParams));
      setPolyDegree(degree);
    }, [location.search]);

    return (
      <div className="flex flex-col w-[25rem] flex-wrap px-3">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={degreeParamName}
          optionsArray={degreesArray}
          shownPlaceholder={firstShownPlaceholder}
          selectLabel={firstSelectLabel}
        />

        <SelectPolynomial
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={polynomialParamName}
          polyDegree={polyDegree}
          shownPlaceholder={secondShownPlaceholder}
          selectLabel={secondSelectLabel}
        />

        <SelectCyclic
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={cyclicPolyParamName}
          polyDegree={polyDegree}
          selectLabel={thirdSelectLabel}
          shownPlaceholder={thirdShownPlaceholder}
        />
      </div>
    );
  },
);

export default MatrixSelect;
