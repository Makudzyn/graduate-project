import {useEffect, useState } from "react";
import GenInput from "../CommonGenComponents/GenInput.tsx";
import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import { polynomialDestructuring } from "../../functions/generatorFunctions.ts";
import {
  createPlaceholder, generateOptions,
  getSelectedParam
} from "../../functions/functions.ts";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";
import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";
import SelectPolynomial from "../CommonGenComponents/Select/SelectPolynomial.tsx";

interface LinearInputBlockProps {
  firstSelectLabel: string;
  firstShownPlaceholder: string;
  secondSelectLabel: string;
  secondShownPlaceholder: string;
  inputLabel: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  polynomialType?: PolynomialType;
}

const LinearInputBlock = observer(
  ({
    firstSelectLabel,
    firstShownPlaceholder,
    secondSelectLabel,
    secondShownPlaceholder,
    inputLabel,
    searchParams,
    setSearchParams,
    degreeParam,
    polynomialParam,
    userValueParam,
  }: LinearInputBlockProps) => {

    const [inputPlaceholder, setInputPlaceholder] = useState<string>("01");
    const [polyDegree, setPolyDegree] = useState<number>(0);
    const degreesArray = generateOptions();

    useEffect(() => {
      const degree = Number(getSelectedParam(degreeParam, searchParams));
      setPolyDegree(degree);
      const polynomial = getSelectedParam(polynomialParam, searchParams);
      if (polynomial !== null) {
        const { polyBinary } = polynomialDestructuring(polynomial);
        setInputPlaceholder(createPlaceholder(polyBinary));
      }
    }, [location.search]);

    return (
      <div className="flex flex-col justify-center w-[25rem]">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={degreeParam}
          optionsArray={degreesArray}
          shownPlaceholder={firstShownPlaceholder}
          selectLabel={firstSelectLabel}
        />

        <SelectPolynomial
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={polynomialParam}
          polyDegree={polyDegree}
          shownPlaceholder={secondShownPlaceholder}
          selectLabel={secondSelectLabel}
        />

        <GenInput
          inputLabel={inputLabel}
          urlParamName={userValueParam}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          inputPlaceholder={inputPlaceholder}
          lengthRestriction={polyDegree}
          disabled={false}
        />
      </div>
    );
  },
);

export default LinearInputBlock;
