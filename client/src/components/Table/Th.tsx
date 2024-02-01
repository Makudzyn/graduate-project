import { PolynomialWithoutDate, SortState } from "../../utils/interfacesAndTypes.ts";
import { Dispatch, SetStateAction } from "react";

interface ThProps {
  sortObj: SortState;
  setSortObj: Dispatch<SetStateAction<SortState>>;
  dataPriority: string;
  columnName: keyof PolynomialWithoutDate;
  ariaControls: string;
  classNames: string;
  children: string;
}

const Th = ({ columnName, sortObj, setSortObj, dataPriority, ariaControls, classNames, children }: ThProps) => {
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
    {children}
  </th>
 );
};

export default Th;