import { useState } from "react";
import { Polynomial, SortState } from "../../utils/interfacesAndTypes.ts";
import Search from "./Search.tsx";
import useSortPolynomials from "../../hooks/usePolynomialsSort.ts";
import useFilterPolynomials from "../../hooks/useFilteredPolynomials.ts";
import Th from "./Th.tsx";
import TableSelect from "./Select/TableSelect.tsx";

interface PolynomialTableProps {
  polynomials: Polynomial[];
}

const PolynomialTable = ({ polynomials }: PolynomialTableProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortState>({
    column: "id",
    order: "ascending",
  });

  const sortedPolynomials = useSortPolynomials(polynomials, sortBy);
  const filteredPolynomials = useFilterPolynomials(
    sortedPolynomials,
    searchQuery,
  );

  const OPTIONS_ARRAY = [10, 25, 50, 100];
  const [entriesCount, setEntriesCount] = useState<number>(10);
  return (
    <div className="container mx-auto w-full px-2">
      <h1 className="flex items-center break-normal px-2 py-8 font-sans text-xl font-bold text-indigo-500">
        Polynomials Table
      </h1>

      <div className="mt-6 rounded bg-white p-8 shadow">
        <div className="">
          <div className="flex justify-between items-center mb-7">
            <TableSelect value={entriesCount} setValue={setEntriesCount} labelStart={"Show"} labelEnd={"entries"} optionsArray={OPTIONS_ARRAY}/>
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
              {filteredPolynomials.map((poly, index) => (
                <tr
                  className={index % 2 ? "bg-gray-50" : "bg-gray-200"}
                  key={poly.id}
                >
                  <td className="px-2.5 py-2" tabIndex={0}>
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
              Showing 1 to 10 of {polynomials.length} entries
            </div>

            <div className="text-right pt-[0.25em]" id="paginate">
              <a
                className="box-border inline-block cursor-pointer rounded border border-transparent bg-gray-300 px-4 py-2 text-center no-underline min-w-[1.5em] ml-0.5 disabled"
                aria-controls="polynomials"
                tabIndex={0}
                id="previous"
              >
                Previous
              </a>

              <span>
                <a
                  className="box-border inline-block min-w-[1.5em] ml-0.5 text-center no-underline cursor-pointer border border-[#0000004C] px-4 py-2 bg-gradient-to-b rounded"
                  aria-controls="polynomials"
                  data-dt-idx="1"
                  tabIndex={0}
                >
                  1
                </a>
                <a
                  className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                  aria-controls="polynomials"
                  data-dt-idx="2"
                  tabIndex={0}
                >
                  2
                </a>
                <a
                  className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                  aria-controls="polynomials"
                  data-dt-idx="3"
                  tabIndex={0}
                >
                  3
                </a>
                <a
                  className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                  aria-controls="polynomials"
                  data-dt-idx="4"
                  tabIndex={0}
                >
                  4
                </a>
                <a
                  className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                  aria-controls="polynomials"
                  data-dt-idx="5"
                  tabIndex={0}
                >
                  5
                </a>
                <a
                  className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                  aria-controls="polynomials"
                  data-dt-idx="6"
                  tabIndex={0}
                >
                  6
                </a>
              </span>

              <a
                className="box-border inline-block cursor-pointer rounded border border-transparent bg-indigo-500 px-4 py-2 text-center text-white no-underline min-w-[1.5em] ml-0.5"
                aria-controls="polynomials"
                data-dt-idx="7"
                tabIndex={0}
                id="next"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolynomialTable;
