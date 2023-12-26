import Select from "../SelectList/Select.tsx";
import { observer } from "mobx-react-lite";
import { SetURLSearchParams } from "react-router-dom";
import { Polynomial } from "../../utils/interfacesAndTypes.ts";

interface MatrixSelectProps {
  firstSelectLabel: string;
  secondSelectLabel: string;
  degreeParamName: string;
  polynomialParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  degreeArray: number[];
  polynomialArray: Polynomial[];
}

const MatrixSelect = observer(
  ({
    firstSelectLabel,
    secondSelectLabel,
    degreeParamName,
    polynomialParamName,
    searchParams,
    setSearchParams,
    degreeArray,
    polynomialArray,
  }: MatrixSelectProps) => {
    return (
      <div className="flex flex-col w-96">
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
      </div>
    );
  },
);

export default MatrixSelect;
