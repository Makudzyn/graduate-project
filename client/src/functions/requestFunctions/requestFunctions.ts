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
  } catch (error: any) {
    console.error("Error creating history record in DB: ", error.message);
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
  } catch (error: any) {
    console.error("Error deleting history record: ", error.message);
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
  } catch (error: any) {
    console.error("Error deleting list of history records: ", error.message);
  }
}
