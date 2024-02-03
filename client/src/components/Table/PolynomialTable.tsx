import { useState } from "react";
import { Polynomial, SortState } from "../../utils/interfacesAndTypes.ts";
import Search from "./Search.tsx";
import useSortPolynomials from "../../hooks/usePolynomialsSort.ts";
import useFilterPolynomials from "../../hooks/useFilteredPolynomials.ts";
import Th from "./Th.tsx";
import TableSelect from "./Select/TableSelect.tsx";
import PaginationButtons from "./PaginationButtons.tsx";

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
  const paginatedPolynomials = filteredPolynomials.slice(offset, offset + limit);

  const OPTIONS_ARRAY = [10, 25, 50, 100, 250];



  return (
    <div className="container mx-auto w-full px-2">
      <h1 className="flex items-center break-normal px-2 py-8 font-sans text-xl font-bold text-indigo-500">
        Polynomials Table
      </h1>

      <div className="mt-6 rounded bg-white p-8 shadow">
        <div className="">
          <div className="mb-7 flex items-center justify-between">
            <TableSelect value={limit} setValue={setLimit} labelStart={"Show"} labelEnd={"entries"} optionsArray={OPTIONS_ARRAY}/>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <table
            id="polynomials"
            className="box-border border-b border-b-[#0000004C] w-full py-4 my-3"
            role="grid"
            aria-describedby="info"
          >
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

            <tbody className="text-left">
              {paginatedPolynomials.map((poly, index) => (
                <tr
                  className={index % 2 ? "bg-gray-50" : "bg-gray-200"}
                  key={poly.id}
                >
                  <td className="py-2 px-2.5" tabIndex={0}>
                    {poly.id}
                  </td>
                  <td>{poly.degree}</td>
                  <td>{poly.name}</td>
                  <td>{poly.polynomial}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between">
            <div
              className="pt-[0.755em]"
              id="info"
              role="status"
              aria-live="polite"
            >
              Showing {offset + 1} to {Math.min(offset + limit, totalCount)} of {totalCount} entries
            </div>

            <PaginationButtons totalCount={totalCount} limit={limit} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolynomialTable;
