import { useEffect, useState } from "react";
import { fetchPolynomials } from "../http/polynomialsAPI.ts";
import PolynomialsStore from "../store/PolynomialsStore.ts";

function usePolynomialsFetching(
  polynomialsStore: PolynomialsStore,
  limit?: number,
  page: number = 1,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPolynomials(limit, page);
        polynomialsStore.setPolynomials(data);
      } catch (error: any) {
        console.error("Error fetching polynomials: ", error.message);
        setError("Error fetching polynomials");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return { loading, error };
}

export default usePolynomialsFetching;
