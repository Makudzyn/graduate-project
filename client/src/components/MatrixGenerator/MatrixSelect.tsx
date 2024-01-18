import Select from "../SelectList/Select.tsx";
import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import { BooleanSelect, Polynomial } from "../../utils/interfacesAndTypes.ts";

interface MatrixSelectProps {
  firstSelectLabel: string;
  firstShownPlaceholder: string;
  secondSelectLabel: string;
  secondShownPlaceholder: string;
  thirdSelectLabel: string;
  thirdShownPlaceholder: string;
  degreeParamName: string;
  polynomialParamName: string;
  cyclicPolyParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeArray: number[];
  polynomialArray: Polynomial[];
  cyclicSelect: BooleanSelect[];
}

const MatrixSelect = observer(
  ({
    firstSelectLabel,
    firstShownPlaceholder,
    secondSelectLabel,
    secondShownPlaceholder,
    thirdSelectLabel,
    thirdShownPlaceholder,
    degreeParamName,
    polynomialParamName,
    cyclicPolyParamName,
    searchParams,
    setSearchParams,
    degreeArray,
    polynomialArray,
    cyclicSelect,
  }: MatrixSelectProps) => {

    return (
      <div className="flex flex-col w-[25rem] flex-wrap px-3">
        <Select
          selectLabel={firstSelectLabel}
          shownPlaceholder={firstShownPlaceholder}
          urlParamName={degreeParamName}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={degreeArray}
        />

        <Select
          selectLabel={secondSelectLabel}
          shownPlaceholder={secondShownPlaceholder}
          urlParamName={polynomialParamName}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={polynomialArray}
        />

        <Select
          selectLabel={thirdSelectLabel}
          shownPlaceholder={thirdShownPlaceholder}
          urlParamName={cyclicPolyParamName}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={cyclicSelect}
        />
      </div>
    );
  },
);

export default MatrixSelect;
