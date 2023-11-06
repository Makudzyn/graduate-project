import { useContext, useEffect, useState } from "react";
import Select from "../SelectList/Select.tsx";
import Input from "../Input.tsx";
import { Context } from "../../main.tsx";
import { Polynomial } from "../../store/PolynomialsStore.ts";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  PARAMS_SELECTED_DEGREE,
  PARAMS_SELECTED_POLYNOMIAL,
  PARAMS_USER_VALUE,
} from "../../utils/consts.ts";
import { polynomialDestructuring } from "../../functions/generatorFunctions.ts";

function createPlaceholder(polynomial: string): string {
  return "0".repeat(polynomial.length - 2) + "1";
}

function getSelectedDegree(searchParams: URLSearchParams): string {
  return searchParams.get(PARAMS_SELECTED_DEGREE) || "1";
}

function getSelectedPolynomial(searchParams: URLSearchParams): string {
  return searchParams.get(PARAMS_SELECTED_POLYNOMIAL) || "11";
}

function getUserValue(searchParams: URLSearchParams): string {
  return searchParams.get(PARAMS_USER_VALUE) || "10";
}

function generateOptions() {
  return Array.from({ length: 15 }, (_, index) => index + 1);
}

const InputBlock = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  const [searchParams, setSearchParams] = useSearchParams({
    degree: "2",
    polynomial: "1 7 H",
    value: "01",
  });

  const [polynomialArr, setPolynomialArr] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const [inputPlaceholder, setInputPlaceholder] = useState<string>("10");
  const options = generateOptions();

  const location = useLocation();

  useEffect(() => {
    const selectedDegree = getSelectedDegree(searchParams);
    const selectedPolynomial = getSelectedPolynomial(searchParams);
    const userValue = getUserValue(searchParams);

    calculationInfoStore.setAllInputValues(
      selectedDegree,
      selectedPolynomial,
      userValue,
    );

    setPolynomialArr(
      polynomialsStore.polynomials.filter(
        (poly) => poly.degree === Number(selectedDegree),
      ),
    );
    const { polyBinary } = polynomialDestructuring(selectedPolynomial);
    setInputPlaceholder(createPlaceholder(polyBinary));
  }, [location.search]);

  return (
    <div className="flex flex-col justify-center py-3 w-[500px]">
      <Select
        selectLabel={"Оберіть ступінь поліному"}
        urlParamName={PARAMS_SELECTED_DEGREE}
        searchParams={searchParams}
        setSelectedOptionToParams={setSearchParams}
        optionsArray={options}
      />

      <Select
        selectLabel={"Оберіть поліном"}
        urlParamName={PARAMS_SELECTED_POLYNOMIAL}
        searchParams={searchParams}
        setSelectedOptionToParams={setSearchParams}
        optionsArray={polynomialArr}
      />

      <Input
        inputLabel={"Введіть початковий стан"}
        urlParamName={PARAMS_USER_VALUE}
        setValue={setSearchParams}
        inputPlaceholder={inputPlaceholder}
        disabled={false}
      />
    </div>
  );
});

export default InputBlock;
