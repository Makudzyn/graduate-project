import { useContext, useEffect, useState } from "react";
import Select from "../SelectList/Select.tsx";
import Input from "../Input.tsx";
import { Context } from "../../main.tsx";
import { Polynomial } from "../../store/PolynomialsStore.ts";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  PARAMS_DEGREE_A,
  PARAMS_POLYNOMIAL_A,
  PARAMS_USER_VALUE,
} from "../../utils/consts.ts";
import { polynomialDestructuring } from "../../functions/generatorFunctions.ts";
import {
  createPlaceholder,
  generateOptions,
  getSelectedDegree,
  getSelectedPolynomial,
  getUserValue
} from "../../functions/functions.ts";




const InputBlock = observer(() => {
  const { polynomialsStore, calculationInfoStore } = useContext(Context)!;

  const [searchParams, setSearchParams] = useSearchParams({
    degree_a: "2",
    polynomial_a: "1 7 H",
    value: "01",
  });

  const [polynomialArr, setPolynomialArr] = useState<Polynomial[]>(
    polynomialsStore.polynomials,
  );

  const [inputPlaceholder, setInputPlaceholder] = useState<string>("10");
  const options = generateOptions();

  const location = useLocation();

  useEffect(() => {
    const selectedDegree = getSelectedDegree(PARAMS_DEGREE_A, searchParams);
    const selectedPolynomial = getSelectedPolynomial(PARAMS_POLYNOMIAL_A,searchParams);
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
        urlParamName={PARAMS_DEGREE_A}
        searchParams={searchParams}
        setSelectedOptionToParams={setSearchParams}
        optionsArray={options}
      />

      <Select
        selectLabel={"Оберіть поліном"}
        urlParamName={PARAMS_POLYNOMIAL_A}
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
