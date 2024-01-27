import { useEffect } from "react";
import PolynomialsStore from "../store/PolynomialsStore.ts";
import { Polynomial } from "../utils/interfacesAndTypes.ts";

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
  }, []);
};

export default usePolynomialsFetching;
