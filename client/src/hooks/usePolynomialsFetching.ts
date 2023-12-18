import { useEffect } from "react";
import PolynomialsStore, { Polynomial } from "../store/PolynomialsStore.ts";

const usePolynomialsFetching = (
  fetchPolynomials: () => Promise<Polynomial[]>,
  polynomialsStore: PolynomialsStore,
) => {
  useEffect(() => {
    let isMounted = true;
    fetchPolynomials()
      .then((data: Polynomial[]) => {
        if (isMounted) {
          polynomialsStore.setPolynomials(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching polynomials:", error);
      });

    return () => {
      isMounted = false; // Clean up to prevent state updates on unmounted components
    };
  }, [fetchPolynomials, polynomialsStore]);
};

export default usePolynomialsFetching;
