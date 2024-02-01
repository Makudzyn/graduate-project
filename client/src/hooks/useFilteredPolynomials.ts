import { useMemo } from "react";
import { Polynomial } from "../utils/interfacesAndTypes.ts";
import { filterByQuery } from "../functions/functions.ts";

function useFilterPolynomials(polynomials: Polynomial[], searchQuery: string) {
  return useMemo(() => {
    return searchQuery === ""
      ? polynomials
      : polynomials.filter((poly) => filterByQuery(poly, searchQuery));
  }, [polynomials, searchQuery]);
}

export default useFilterPolynomials;
