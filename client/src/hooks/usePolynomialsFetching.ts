import { useEffect } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import PolynomialsStore from "../store/PolynomialsStore.ts";

function usePolynomialsFetching( polynomialsStore: PolynomialsStore) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPolynomials();
        polynomialsStore.setPolynomials(data);
      } catch (error: any) {
        console.error("Error fetching polynomials: ", error.message);
      }
    };

    fetchData();
  }, []);
}


export default usePolynomialsFetching;
