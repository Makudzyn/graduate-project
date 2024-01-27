import usePolynomialsFetching from "../../hooks/usePolynomialsFetching.ts";
import { fetchPolynomials } from "../../http/polynomialsAPI.ts";
import { useContext, useState } from "react";
import { Context } from "../../main.tsx";
import { Polynomial } from "../../utils/interfacesAndTypes.ts";

interface PolynomialTableProps {}


type PolynomialWithoutDate = Omit<Polynomial, keyof { createdAt: Date; updatedAt: Date }>;
interface SortState {
  column: keyof PolynomialWithoutDate;
  order: 'ascending' | 'descending';
}
const PolynomialTable = ({}: PolynomialTableProps) => {
  const {polynomialsStore} = useContext(Context)!;
  usePolynomialsFetching(fetchPolynomials, polynomialsStore);

  const [sortBy, setSortBy] = useState<SortState>({ column: 'id', order: 'ascending' });

  const handleSort = (column: keyof PolynomialWithoutDate) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy.column === column) {
        return { column, order: prevSortBy.order === 'ascending' ? 'descending' : 'ascending' };
      } else {
        return { column, order: 'ascending' };
      }
    });
  };

  const compareValues = (a: string | number, b: string | number): number => {
    if (typeof a === 'string' && sortBy.column !== "polynomial") {
      return sortBy.order === 'ascending' ? a.localeCompare(b as string) : (b as string).localeCompare(a);
    } else {
      return sortBy.order === 'ascending' ? (a as number) - (b as number) : (b as number) - (a as number);
    }
  };

  const sortedPolynomials = polynomialsStore.polynomials.sort((a, b) => {
    return compareValues(a[sortBy.column], b[sortBy.column]);
  });

  return (
    <div className="container mx-auto w-full px-2 md:w-4/5 xl:w-3/5">
      <h1 className="flex items-center break-normal px-2 py-8 font-sans text-xl font-bold text-indigo-500">
        Polynomials Table
      </h1>

      <div className="mt-6 rounded bg-white p-8 shadow">
        <div className="">
          <div className="flex justify-between items-center mb-7">
            <div className="">
              <label>
                Show
                <select
                  name="length"
                  aria-controls="polynomials"
                  className="mx-2 py-1 px-2 appearance-none bg-transparent text-indigo-500 border border-[#aaa] rounded"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </label>
            </div>

            <div className="text-right">
              <label>
                Search:
                <input
                  type="search"
                  className="border border-[#aaa] rounded p-[0.3125rem] bg-transparent ml-[0.1875rem] focus:outline-none focus:shadow-outline"
                  placeholder=""
                  aria-controls="polynomials"
                />
              </label>
            </div>
          </div>

          <table
            id="polynomials"
            className="box-border border-b border-b-[#0000004C] w-full py-4 my-3"
            role="grid"
            aria-describedby="info"
          >
            <thead>
              <tr role="row">
                <th
                  data-priority="1"
                  className="cursor-pointer border-b-2 border-indigo-500 w-[10%] px-2.5 py-4"
                  tabIndex={0}
                  aria-controls="polynomials"
                  aria-sort={sortBy.column === 'id' ? sortBy.order : "none"}
                  aria-label="Id: activate to sort column"
                  onClick={() => handleSort('id')}
                >
                  Id
                </th>
                <th
                  data-priority="2"
                  className="relative cursor-pointer border-b-2 border-indigo-500 w-[10%] px-2.5 py-4"
                  tabIndex={0}
                  aria-controls="polynomials"
                  aria-sort={sortBy.column === 'degree' ? sortBy.order : 'none'}
                  aria-label="Degree: activate to sort column"
                  onClick={() => handleSort('degree')}
                >
                  Degree
                </th>
                <th
                  data-priority="3"
                  className="relative cursor-pointer border-b-2 border-indigo-500 w-[30%] px-2.5 py-4"
                  tabIndex={0}
                  aria-controls="polynomials"
                  aria-sort={sortBy.column === 'name' ? sortBy.order : 'none'}
                  aria-label="Name: activate to sort column"
                  onClick={() => handleSort('name')}
                >
                  Name
                </th>
                <th
                  data-priority="4"
                  className="relative cursor-pointer border-b-2 border-indigo-500 w-[50%] px-2.5 py-4"
                  tabIndex={0}
                  aria-controls="polynomials"
                  aria-sort={sortBy.column === 'polynomial' ? sortBy.order : 'none'}
                  aria-label="Polynomial: activate to sort column"
                  onClick={() => handleSort('polynomial')}
                >
                  Polynomial
                </th>
              </tr>
            </thead>

            <tbody className="text-left">
              {sortedPolynomials.map((poly, index) => (
                <tr className={index % 2 ? "bg-gray-50" : "bg-gray-200"} key={poly.id}>
                  <td className="px-2.5 py-2" tabIndex={0} >
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
              Showing 1 to 10 of {polynomialsStore.polynomials.length} entries
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
