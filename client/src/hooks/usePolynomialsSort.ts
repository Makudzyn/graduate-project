import { useMemo } from "react";
import { Polynomial, SortState } from "../utils/interfacesAndTypes.ts";
import { compareValues } from "../functions/functions.ts";

function useSortPolynomials(polynomials: Polynomial[], sortBy: SortState) {
  return useMemo(() => {
    return [...polynomials].sort((a, b) => compareValues(sortBy, a, b));
  }, [polynomials, sortBy]);
}

export default useSortPolynomials;