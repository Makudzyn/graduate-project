import { Dispatch, SetStateAction, useEffect } from "react";

function useDataFetching(
  fetchFunction: () => Promise<any>,
  dataSetter: (data: any) => void,
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
