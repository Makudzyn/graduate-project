import { useEffect, useState } from 'react';

function useDataFetching(fetchFunction: () => Promise<any>, dataSetter: (data: any) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction();
        dataSetter(data);
      } catch (error: any) {
        console.error("Error fetching data: ", error.message);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error };
}

export default useDataFetching;