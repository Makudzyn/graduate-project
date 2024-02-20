import { useEffect, useState } from "react";

function useDataFetching(
  fetchFunction: () => Promise<any>,
  dataSetter: (data: any) => void,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFunction()
      .then((data) => dataSetter(data))
      .catch(() => setError("Error fetching data"))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error };
}

export default useDataFetching;
