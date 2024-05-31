import { SetURLSearchParams } from "react-router-dom";
import GenericSelect from "./GenericSelect.tsx";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../main.tsx";
import { Polynomial } from "../../../utils/interfacesAndTypes.ts";
import { observer } from "mobx-react-lite";

interface SelectPolynomialProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  urlParamName: string;
  polyDegree: number;
  shownPlaceholder?: string;
  selectLabel?: string;
}

const SelectPolynomial = observer(({
  searchParams,
  setSearchParams,
  urlParamName,
  polyDegree,
  selectLabel,
  shownPlaceholder,
}: SelectPolynomialProps) => {
  const { polynomialsStore } = useContext(Context)!;
  const [polynomialArr, setPolynomialArr] = useState<Polynomial[]>([]);

  useEffect(() => {
    const filteredPolynomials = polynomialsStore.polynomials.filter(
      (poly) => poly.degree === polyDegree,
    );
    setPolynomialArr(filteredPolynomials);
  }, [polyDegree]);

  function handleChange(targetValue: Polynomial) {
    const value = targetValue.name;

    setSearchParams(
      (prev: any) => {
        prev.set(urlParamName, value);
        return prev;
      },
      { replace: true },
    );
  }

  function formatPolynomial(optionValue: Polynomial) {
    return optionValue.name + " | " + optionValue.polynomial;
  }

  return (
    <GenericSelect
      searchParams={searchParams}
      urlParamName={urlParamName}
      optionsArray={polynomialArr}
      handleChange={handleChange}
      formatOptionValue={formatPolynomial}
      selectLabel={selectLabel}
      shownPlaceholder={shownPlaceholder}
    />
  );
});

export default SelectPolynomial;
