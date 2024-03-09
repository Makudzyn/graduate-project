import {useEffect, useState } from "react";
import InputBinary from "./InputBinary.tsx";
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
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParam: string;
  polynomialParam: string;
  userValueParam: string;
  polynomialType?: PolynomialType;
}

const LinearInputBlock = observer(
  ({
    searchParams,
    setSearchParams,
    degreeParam,
    polynomialParam,
    polynomialType,
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

    const DEGREE_LABEL = `Оберіть ступінь поліному ${polynomialType || ""}`;
    const DEGREE_PLACEHOLDER = `Ступінь поліному ${polynomialType || ""}`;
    const POLYNOMIAL_LABEL = `Оберіть поліном ${polynomialType || ""}`;
    const POLYNOMIAL_PLACEHOLDER = `Поліном ${polynomialType || ""}`;
    const INPUT_LABEL = `Введіть початковий стан ${polynomialType || ""}`;

    return (
      <div className="flex flex-col justify-center w-[25rem]">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={degreeParam}
          optionsArray={degreesArray}
          selectLabel={DEGREE_LABEL}
          shownPlaceholder={DEGREE_PLACEHOLDER}
        />

        <SelectPolynomial
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={polynomialParam}
          polyDegree={polyDegree}
          selectLabel={POLYNOMIAL_LABEL}
          shownPlaceholder={POLYNOMIAL_PLACEHOLDER}
        />

        <InputBinary
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={userValueParam}
          inputLabel={INPUT_LABEL}
          inputPlaceholder={inputPlaceholder}
          lengthRestriction={polyDegree}
        />
      </div>
    );
  },
);

export default LinearInputBlock;
