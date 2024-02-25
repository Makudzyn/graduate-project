import useDataFetching from "./useDataFetching.ts";
import PolynomialsStore from "../../store/PolynomialsStore.ts";
import { fetchPolynomials } from "../../http/polynomialsAPI.ts";
import { Dispatch, SetStateAction } from "react";

function usePolynomialsFetching(polynomialsStore: PolynomialsStore, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string | null>>) {
  useDataFetching(fetchPolynomials, (data) => {
    polynomialsStore.setPolynomials(data.polynomials);
    polynomialsStore.setTotalCount(data.count);
  }, setLoading, setError);
}

export default usePolynomialsFetching;
