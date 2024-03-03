import { SetURLSearchParams } from "react-router-dom";
import GenericSelect from "./GenericSelect.tsx";

interface SelectValueProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  urlParamName: string;
  optionsArray: number[];
  shownPlaceholder?: string;
  selectLabel?: string;
}

const SelectValue = ({
  searchParams,
  setSearchParams,
  urlParamName,
  optionsArray,
  selectLabel,
  shownPlaceholder,
}: SelectValueProps) => {
  function handleChange(targetValue: string | number) {
    const value = String(targetValue);

    setSearchParams(
      (prev: any) => {
        prev.set(urlParamName, value);
        return prev;
      },
      { replace: true },
    );
  }

  return (
    <GenericSelect
      searchParams={searchParams}
      urlParamName={urlParamName}
      optionsArray={optionsArray}
      handleChange={handleChange}
      selectLabel={selectLabel}
      shownPlaceholder={shownPlaceholder}
    />
  );
};

export default SelectValue;
