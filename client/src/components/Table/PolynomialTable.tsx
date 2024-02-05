import { useState } from "react";
import { Polynomial, SortState } from "../../utils/interfacesAndTypes.ts";
import Search from "./Search.tsx";
import useSortPolynomials from "../../hooks/usePolynomialsSort.ts";
import useFilterPolynomials from "../../hooks/useFilteredPolynomials.ts";
import TableSelect from "./Select/TableSelect.tsx";
import PaginationButtons from "./PaginationButtons.tsx";
import EntriesInfo from "./EntriesInfo.tsx";
import Thead from "./Thead.tsx";
import Tbody from "./Tbody.tsx";

interface PolynomialTableProps {
  polynomials: Polynomial[];
  totalCount: number;
}

const PolynomialTable = ({ polynomials, totalCount }: PolynomialTableProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortState>({
    column: "id",
    order: "ascending",
  });

  const [limit, setLimit] = useState<number>(25);
  const [page, setPage] = useState<number>(1);
  const offset = (page - 1) * limit;

  const sortedPolynomials = useSortPolynomials(polynomials, sortBy);
  const filteredPolynomials = useFilterPolynomials(
    sortedPolynomials,
    searchQuery,
  );
  const paginatedPolynomials = filteredPolynomials.slice(
    offset,
    offset + limit,
  );

  const OPTIONS_ARRAY = [10, 25, 50, 100, 250];

  return (
    <div className="container mx-auto w-full px-2">
      <h1 className="flex items-center break-normal px-2 py-8 font-sans text-xl font-bold text-indigo-500">
        Polynomials Table
      </h1>

      <div className="mt-6 rounded bg-white p-8 shadow">
        <div className="mb-7 flex items-center justify-between transition">
          <TableSelect
            value={limit}
            setValue={setLimit}
            setPage={setPage}
            labelStart={"Show"}
            labelEnd={"entries"}
            optionsArray={OPTIONS_ARRAY}
          />
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <table
          id="polynomials"
          className="box-border border-b border-b-[#0000004C] w-full py-4 my-3"
          role="grid"
          aria-describedby="info"
        >
          <Thead sortBy={sortBy} setSortBy={setSortBy}/>

          <Tbody polynomialsArray={paginatedPolynomials}/>
        </table>

        <div className="w-full my-2 h-12 flex justify-between items-center">
          <EntriesInfo offset={offset} limit={limit} totalCount={totalCount}/>

          <PaginationButtons
            totalCount={totalCount}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PolynomialTable;
