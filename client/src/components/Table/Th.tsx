import {
  PolynomialWithoutDate,
  SortState,
} from "../../utils/interfacesAndTypes.ts";
import { Dispatch, SetStateAction } from "react";
import Triangle from "../../assets/svgs/triangle.svg?react";

interface ThProps {
  sortObj: SortState;
  setSortObj: Dispatch<SetStateAction<SortState>>;
  dataPriority: string;
  columnName: keyof PolynomialWithoutDate;
  ariaControls: string;
  classNames: string;
  children: string;
}

const Th = ({
  columnName,
  sortObj,
  setSortObj,
  dataPriority,
  ariaControls,
  classNames,
  children,
}: ThProps) => {
  const handleSort = (column: keyof PolynomialWithoutDate) => {
    setSortObj((prevSortBy) => {
      if (prevSortBy.column === column) {
        return {
          column,
          order: prevSortBy.order === "ascending" ? "descending" : "ascending",
        };
      } else {
        return { column, order: "ascending" };
      }
    });
  };

  return (
    <th
      data-priority={dataPriority}
      className={`cursor-pointer border-b-2 border-indigo-500 px-2.5 py-4 ${classNames}`}
      tabIndex={0}
      aria-controls={ariaControls}
      aria-sort={sortObj.column === columnName ? sortObj.order : "none"}
      aria-label={`${columnName}: activate to sort column`}
      onClick={() => handleSort(columnName)}
    >
      <span className="flex justify-center items-center relative">
        {children}
        <span className="absolute right-0" role="presentation">
          <Triangle
            className={`w-2 h-2 transition ${
              sortObj.column === columnName && sortObj.order === "ascending"
                ? "fill-purpleFirst"
                : sortObj.column === columnName && sortObj.order === "descending"
                  ? "fill-transparent"
                  : "fill-gray-400"
            }`}
            data-sort-direction={
              sortObj.column === columnName && sortObj.order === "ascending"
                ? "ascending"
                : "none"
            }
            aria-hidden="true"
          />
          <Triangle
            className={`w-2 h-2 transition -rotate-180 fill-gray-400 ${
              sortObj.column === columnName && sortObj.order === "descending"
                ? "fill-purpleFirst"
                : sortObj.column === columnName && sortObj.order === "ascending"
                  ? "fill-transparent"
                  : "fill-gray-400"
            }`}
            data-sort-direction={
              sortObj.column === columnName && sortObj.order === "descending"
                ? "descending"
                : "none"
            }
            aria-hidden="true"
          />
        </span>
      </span>
    </th>
  );
};

export default Th;
