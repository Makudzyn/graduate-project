import Select from "../SelectList/Select.tsx";
import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import { BooleanSelect, Polynomial } from "../../utils/interfacesAndTypes.ts";

interface MatrixSelectProps {
  firstSelectLabel: string;
  secondSelectLabel: string;
  thirdSelectLabel: string;
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
    secondSelectLabel,
    thirdSelectLabel,
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
          urlParamName={degreeParamName}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={degreeArray}
        />

        <Select
          selectLabel={secondSelectLabel}
          urlParamName={polynomialParamName}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          optionsArray={polynomialArray}
        />

        <Select
          selectLabel={thirdSelectLabel}
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
