import Th from "./Th.tsx";
import { SortState } from "../../utils/interfacesAndTypes.ts";
import { Dispatch, SetStateAction } from "react";

interface TheadProps {
  sortBy: SortState;
  setSortBy: Dispatch<SetStateAction<SortState>>;
}

const Thead = ({ sortBy, setSortBy }: TheadProps) => {
  return (
    <thead>
      <tr role="row">
        <Th
          columnName={"id"}
          classNames="w-[10%]"
          sortObj={sortBy}
          setSortObj={setSortBy}
          dataPriority={"1"}
          ariaControls={"polynomials"}
        >
          Id
        </Th>
        <Th
          columnName={"degree"}
          classNames="w-[10%]"
          sortObj={sortBy}
          setSortObj={setSortBy}
          dataPriority={"2"}
          ariaControls={"polynomials"}
        >
          Degree
        </Th>
        <Th
          columnName={"name"}
          classNames="w-[30%]"
          sortObj={sortBy}
          setSortObj={setSortBy}
          dataPriority={"3"}
          ariaControls={"polynomials"}
        >
          Name
        </Th>
        <Th
          columnName={"polynomial"}
          classNames="w-[50%]"
          sortObj={sortBy}
          setSortObj={setSortBy}
          dataPriority={"4"}
          ariaControls={"polynomials"}
        >
          Polynomial
        </Th>
      </tr>
    </thead>
  );
};

export default Thead;
