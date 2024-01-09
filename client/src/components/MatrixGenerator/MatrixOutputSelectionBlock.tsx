import Select from "../SelectList/Select.tsx";
import { SetURLSearchParams } from "react-router-dom";

interface MatrixOutputSelectProps {
  firstOutputElementLabel: string;
  firstOptionsArray: number[];
  firstUrlParamName: string;
  secondOutputElementLabel: string;
  secondOptionsArray: number[];
  secondUrlParamName: string;
  thirdOutputElementLabel: string;
  thirdOptionsArray: number[];
  thirdUrlParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const MatrixOutputSelectionBlock = ({
  firstOutputElementLabel,
  firstOptionsArray,
  firstUrlParamName,
  secondOutputElementLabel,
  secondOptionsArray,
  secondUrlParamName,
  thirdOutputElementLabel,
  thirdOptionsArray,
  thirdUrlParamName,
  searchParams,
  setSearchParams,
}: MatrixOutputSelectProps) => {
  return (
    <div className="flex items-center justify-center px-3 w-[25rem]">
      <div className="flex flex-col flex-wrap w-[15rem]">
        <Select
          selectLabel={firstOutputElementLabel}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          urlParamName={firstUrlParamName}
          optionsArray={firstOptionsArray}
        />

        <Select
          selectLabel={secondOutputElementLabel}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          urlParamName={secondUrlParamName}
          optionsArray={secondOptionsArray}
        />

        <Select
          selectLabel={thirdOutputElementLabel}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          urlParamName={thirdUrlParamName}
          optionsArray={thirdOptionsArray}
        />
      </div>
    </div>
  );
};

export default MatrixOutputSelectionBlock;
