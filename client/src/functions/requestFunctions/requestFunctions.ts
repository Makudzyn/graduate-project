import {
  createHistoryRecordRequest,
  deleteAllHistoryRecordsRequest,
  deleteHistoryRecordRequest,
} from "../../http/historyRecordsAPI.ts";
import { HistoryRecord } from "../../utils/interfacesAndTypes.ts";
import { Dispatch, SetStateAction } from "react";

export async function handleHistoryRecordCreation(userId: number) {
  const pageName = location.pathname;
  const parameters = location.search;
  try {
    await createHistoryRecordRequest(userId, pageName, parameters);
  } catch (error) {
    let errorMessage = 'Error creating history record in DB';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage);
  }
}

export async function handleHistoryRecordDeletion(
  recordId: number,
  dataArray: HistoryRecord[],
  setFilteredData: Dispatch<SetStateAction<HistoryRecord[]>>,
) {
  try {
    await deleteHistoryRecordRequest(recordId);
    const updatedDataArray = dataArray.filter((data) => data.id !== recordId);
    setFilteredData(updatedDataArray);
  } catch (error) {
    let errorMessage = 'Error deleting history record';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage);
  }
}

export async function handleHistoryRecordsListDeletion(
  userId: number,
  pageName: string,
  setFilteredData: Dispatch<SetStateAction<HistoryRecord[]>>,
) {
  try {
    await deleteAllHistoryRecordsRequest(userId, pageName);
    setFilteredData([]);
  } catch (error) {
    let errorMessage = 'Error deleting list of history records';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage);
  }
}
