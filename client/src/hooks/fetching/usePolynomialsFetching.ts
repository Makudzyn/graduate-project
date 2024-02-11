import useDataFetching from "./useDataFetching.ts";
import PolynomialsStore from "../../store/PolynomialsStore.ts";
import { fetchPolynomials } from "../../http/polynomialsAPI.ts";

function usePolynomialsFetching(polynomialsStore: PolynomialsStore) {
  const { loading, error } = useDataFetching(fetchPolynomials, (data) => {
    polynomialsStore.setPolynomials(data.polynomials);
    polynomialsStore.setTotalCount(data.count);
  });
  return { loading, error };
}

export default usePolynomialsFetching;
