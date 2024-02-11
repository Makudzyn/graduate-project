import useDataFetching from "./useDataFetching.ts";
import UserStore from "../../store/UserStore.ts";
import { fetchHistoryList } from "../../http/historyRecordsAPI.ts";

function useHistoryFetching(userStore: UserStore) {
  const { loading, error } = useDataFetching(fetchHistoryList, (data) => {
    userStore.setHistoryRecords(data);
  });
  return { loading, error };
}

export default useHistoryFetching;
