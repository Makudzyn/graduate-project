import { useContext, useEffect, useState } from "react";
import Select from "../SelectList/Select.tsx";
import GenInput from "../Inputs/GenInput.tsx";
import { Context } from "../../main.tsx";
import { observer } from "mobx-react-lite";
import { SetURLSearchParams, useLocation } from "react-router-dom";
import { polynomialDestructuring } from "../../functions/generatorFunctions.ts";
import {
  createPlaceholder,
  generateOptions,
  getSelectedParam,
} from "../../functions/functions.ts";
import { Polynomial, PolynomialType } from "../../utils/interfacesAndTypes.ts";

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
    const { polynomialsStore } = useContext(Context)!;

    const [polynomialArr, setPolynomialArr] = useState<Polynomial[]>([]);

    const [inputPlaceholder, setInputPlaceholder] = useState<string>("01");
    const [lengthRestriction, setLengthRestriction] = useState<number>(0);


    const options = generateOptions();
    const location = useLocation();

    useEffect(() => {
        const degree = Number(getSelectedParam(degreeParam, searchParams));

        setLengthRestriction(degree);

        setPolynomialArr(
          polynomialsStore.polynomials.filter(
            (poly) => poly.degree === degree,
          ),
        );

        const polynomial = getSelectedParam(polynomialParam, searchParams);
        if (polynomial !== null) {
          const { polyBinary } = polynomialDestructuring(polynomial);
          setInputPlaceholder(createPlaceholder(polyBinary));
        }

    }, [location.search]);

    return (
      <div className="flex flex-col justify-center w-[25rem]">
        <Select
          selectLabel={firstSelectLabel}
          shownPlaceholder={firstShownPlaceholder}
          urlParamName={degreeParam}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={options}
        />

        <Select
          selectLabel={secondSelectLabel}
          shownPlaceholder={secondShownPlaceholder}
          urlParamName={polynomialParam}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={polynomialArr}
        />

        <GenInput
          inputLabel={inputLabel}
          urlParamName={userValueParam}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          inputPlaceholder={inputPlaceholder}
          lengthRestriction={lengthRestriction}
          disabled={false}
        />
      </div>
    );
  },
);

export default LinearInputBlock;
