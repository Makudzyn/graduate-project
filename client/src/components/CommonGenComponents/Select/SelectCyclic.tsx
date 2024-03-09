import { SetURLSearchParams } from "react-router-dom";
import GenericSelect from "./GenericSelect.tsx";
import { useEffect } from "react";
import { BooleanSelect } from "../../../utils/interfacesAndTypes.ts";

interface SelectCyclicProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  urlParamName: string;
  polyDegree: number;
  shownPlaceholder?: string;
  selectLabel?: string;
}

const SelectCyclic = ({
  searchParams,
  setSearchParams,
  urlParamName,
  polyDegree,
  selectLabel,
  shownPlaceholder,
}: SelectCyclicProps) => {

  const cyclicSelection: BooleanSelect[] = [
    { booleanLabel: "Так", booleanValue: true },
    { booleanLabel: "Ні", booleanValue: false },
  ];

  useEffect(() => {

  }, [polyDegree]);

  function handleChange(targetValue: BooleanSelect) {
    const value = String(targetValue.booleanValue);

    setSearchParams(
      (prev: any) => {
        prev.set(urlParamName, value);
        return prev;
      },
      { replace: true },
    );
  }

  function formatCyclic(optionValue: BooleanSelect) {
    return optionValue.booleanLabel;
  }


  return (
    <GenericSelect
      searchParams={searchParams}
      urlParamName={urlParamName}
      optionsArray={cyclicSelection}
      handleChange={handleChange}
      formatOptionValue={formatCyclic}
      selectLabel={selectLabel}
      shownPlaceholder={shownPlaceholder}
    />
  );
};

export default SelectCyclic;