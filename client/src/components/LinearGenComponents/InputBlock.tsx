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

// const optionsData = {
//   "1": ["3"],
//   "2": ["1 7 H"],
//   "3": ["1 13 F"],
//   "4": ["1 23 F", "3 37 D", "5 07"],
//   "5": ["1 45 E", "3 75 G", "5 67 H"],
//   "6": [
//     "1 103 F",
//     "3 1278",
//     "5 147 H",
//     "7 111 A",
//     "9 015",
//     "11 155 E",
//     "21 007",
//   ],
//   "7": [
//     "1 211 E",
//     "3 217 E",
//     "5 235 E",
//     "7 367 H",
//     "9 277 E",
//     "11 325 G",
//     "13 203 F",
//     "19 313 H",
//     "21 345 G",
//   ],
//   "8": [
//     "1 435 E",
//     "3 567 B",
//     "5 763 D",
//     "7 551 E",
//     "9 675 C",
//     "11 747 H",
//     "13 453 F",
//     "15 727 D",
//     "17 023",
//     "19 545 E",
//     "21 613 D",
//     "23 543 F",
//     "25 433 B",
//     "27 477 B",
//     "37 537 F",
//     "43 703 H",
//     "45 471 A",
//     "51 037",
//     "85 007",
//   ],
//   "9": [
//     "1 1021 E",
//     "3 1131 E",
//     "5 1461 G",
//     "7 1231 A",
//     "9 1423 G",
//     "11 1055 E",
//     "13 1167 F",
//     "15 1541 E",
//     "17 1333 F",
//     "19 1605 G",
//     "21 1027 A",
//     "23 1751 E",
//     "25 1743 H",
//     "27 1617 H",
//     "29 1553 H",
//     "35 1401 C",
//     "37 1157 F",
//     "39 1715 E",
//     "41 1563 H",
//     "43 1713 H",
//     "45 1175 E",
//     "51 1725 G",
//     "53 1225 E",
//     "55 1275 E",
//     "73 0013",
//     "75 1773 G",
//     "77 1511 C",
//     "83 1425 G",
//     "85 1267 E",
//   ],
// };

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
    degree: "1",
    polynomial: "11",
    value: "",
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
    setInputPlaceholder(createPlaceholder(selectedPolynomial));
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
