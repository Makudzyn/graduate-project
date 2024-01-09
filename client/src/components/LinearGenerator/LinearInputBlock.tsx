import { useContext, useEffect, useState } from "react";
import Select from "../SelectList/Select.tsx";
import Input from "../Input.tsx";
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
    userValueParam,
    polynomialType,
  }: LinearInputBlockProps) => {
    const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

    const [polynomialArr, setPolynomialArr] = useState<Polynomial[]>(
      polynomialsStore.polynomials,
    );

    const [inputPlaceholder, setInputPlaceholder] = useState<string>("10");

    const options = generateOptions();
    const location = useLocation();

    useEffect(() => {
      const degree = getSelectedParam(degreeParam, searchParams);
      const polynomial = getSelectedParam(polynomialParam, searchParams);
      const userValue = getSelectedParam(userValueParam, searchParams);

      const numDegree = Number(degree);

      switch (polynomialType) {
        case "A":
          calculationInfoStore.setManyInputValues({
            degreeA: numDegree,
            polynomialA: polynomial,
            userValueA: userValue,
          });
          break;
        case "B":
          calculationInfoStore.setManyInputValues({
            degreeB: numDegree,
            polynomialB: polynomial,
            userValueB: userValue,
          });
          break;
        case undefined:
          calculationInfoStore.setManyInputValues({
            degree: numDegree,
            polynomial: polynomial,
            userValue,
          });
          break;
        default:
          throw Error(
            `Wrong polynomial type specified in LinearInputBlock component. Possible types are \"A\", \"B\" or undefined`,
          );
      }
      setPolynomialArr(
        polynomialsStore.polynomials.filter(
          (poly) => poly.degree === numDegree,
        ),
      );

      const { polyBinary } = polynomialDestructuring(polynomial);
      setInputPlaceholder(createPlaceholder(polyBinary));
    }, [location.search]);

    return (
      <div className="flex flex-col justify-center w-[25rem]">
        <Select
          selectLabel={`Оберіть ступінь поліному ${polynomialType || ""}`}
          urlParamName={degreeParam}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={options}
        />

        <Select
          selectLabel={`Оберіть поліном ${polynomialType || ""}`}
          urlParamName={polynomialParam}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={polynomialArr}
        />

        <Input
          inputLabel={`Введіть початковий стан ${polynomialType || ""}`}
          urlParamName={userValueParam}
          setValue={setSearchParams}
          inputPlaceholder={inputPlaceholder}
          disabled={false}
        />
      </div>
    );
  },
);

export default LinearInputBlock;
