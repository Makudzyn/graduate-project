import GenSelect from "../CommonGenComponents/Select/GenSelect.tsx";
import { SetURLSearchParams } from "react-router-dom";

interface MatrixOutputSelectProps {
  firstOutputElementLabel: string;
  firstShownPlaceholder: string;
  firstOptionsArray: number[];
  firstUrlParamName: string;
  secondOutputElementLabel: string;
  secondShownPlaceholder: string;
  secondOptionsArray: number[];
  secondUrlParamName: string;
  thirdOutputElementLabel: string;
  thirdShownPlaceholder: string;
  thirdOptionsArray: number[];
  thirdUrlParamName: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const MatrixOutputSelectionBlock = ({
  firstOutputElementLabel,
  firstShownPlaceholder,
  firstOptionsArray,
  firstUrlParamName,
  secondOutputElementLabel,
  secondShownPlaceholder,
  secondOptionsArray,
  secondUrlParamName,
  thirdOutputElementLabel,
  thirdShownPlaceholder,
  thirdOptionsArray,
  thirdUrlParamName,
  searchParams,
  setSearchParams,
}: MatrixOutputSelectProps) => {
  return (
    <div className="flex items-center justify-center px-3 w-[25rem]">
      <div className="flex flex-col flex-wrap w-[15rem]">
        <GenSelect
          selectLabel={firstOutputElementLabel}
          shownPlaceholder={firstShownPlaceholder}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          urlParamName={firstUrlParamName}
          optionsArray={firstOptionsArray}
        />

        <GenSelect
          selectLabel={secondOutputElementLabel}
          shownPlaceholder={secondShownPlaceholder}
          searchParams={searchParams}
          setSelectedOptionToParams={setSearchParams}
          urlParamName={secondUrlParamName}
          optionsArray={secondOptionsArray}
        />

        <GenSelect
          selectLabel={thirdOutputElementLabel}
          shownPlaceholder={thirdShownPlaceholder}
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
