import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import SelectCyclic from "../CommonGenComponents/Select/SelectCyclic.tsx";
import { useEffect, useState } from "react";
import { generateOptions, getSelectedParam } from "../../functions/functions.ts";
import SelectValue from "../CommonGenComponents/Select/SelectValue.tsx";
import SelectPolynomial from "../CommonGenComponents/Select/SelectPolynomial.tsx";
import { PolynomialType } from "../../utils/interfacesAndTypes.ts";

interface MatrixSelectProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeParamName: string;
  polynomialParamName: string;
  cyclicPolyParamName: string;
  polynomialType: PolynomialType;
}

const MatrixSelect = observer(
  ({
    searchParams,
    setSearchParams,
    degreeParamName,
    polynomialParamName,
    cyclicPolyParamName,
    polynomialType,
  }: MatrixSelectProps) => {
    const [polyDegree, setPolyDegree] = useState<number>(0);
    const degreesArray = generateOptions();

    useEffect(() => {
      const degree = Number(getSelectedParam(degreeParamName, searchParams));
      setPolyDegree(degree);
    }, [location.search]);

    const DEGREE_LABEL = `Оберіть ступінь поліному F(${polynomialType})`
    const DEGREE_PLACEHOLDER = `Ступінь поліному F(${polynomialType})`;
    const POLYNOMIAL_LABEL = `Оберіть поліном F(${polynomialType})`;
    const POLYNOMIAL_PLACEHOLDER = `Поліном F(${polynomialType})`;
    const CYCLIC_LABEL = `Зробити поліном F(${polynomialType}) циклічним?`;
    const CYCLIC_PLACEHOLDER = `Ні`;

    return (
      <div className="flex flex-col w-[25rem] flex-wrap px-3">
        <SelectValue
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={degreeParamName}
          optionsArray={degreesArray}
          shownPlaceholder={DEGREE_LABEL}
          selectLabel={DEGREE_PLACEHOLDER}
        />

        <SelectPolynomial
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={polynomialParamName}
          polyDegree={polyDegree}
          shownPlaceholder={POLYNOMIAL_LABEL}
          selectLabel={POLYNOMIAL_PLACEHOLDER}
        />

        <SelectCyclic
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          urlParamName={cyclicPolyParamName}
          polyDegree={polyDegree}
          selectLabel={CYCLIC_LABEL}
          shownPlaceholder={CYCLIC_PLACEHOLDER}
        />
      </div>
    );
  },
);

export default MatrixSelect;
