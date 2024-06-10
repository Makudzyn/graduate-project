import { Dispatch, SetStateAction, useEffect } from "react";

function useDataFetching<T>(
  fetchFunction: () => Promise<T>,
  dataSetter: (data: T) => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
) {
  useEffect(() => {
    setLoading(true);
    fetchFunction()
      .then((data) => dataSetter(data))
      .catch(() => setError("Помилка отримання данних з сервера."))
      .finally(() => setLoading(false));
  }, []);
}

export default useDataFetching;
