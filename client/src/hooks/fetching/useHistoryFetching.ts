import useDataFetching from './useDataFetching.ts';
import UserStore from '../../store/UserStore.ts';
import { fetchHistoryList } from '../../http/historyRecordsAPI.ts';
import { Dispatch, SetStateAction } from 'react';

function useHistoryFetching(
  userStore: UserStore,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>,
) {
  useDataFetching(
    fetchHistoryList,
    (data) => {
      userStore.setHistoryRecords(data);
    },
    setLoading,
    setError,
  );
}

export default useHistoryFetching;
