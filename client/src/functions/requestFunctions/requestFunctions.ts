import { sendHistoryRecord } from "../../http/historyRecordsAPI.ts";

export async function createHistoryRecord(id: number) {
  const userId = id;
  const pageName = location.pathname;
  const parameters = location.search;
  try {
    await sendHistoryRecord(userId, pageName, parameters);
  } catch (error: any) {
    console.error("Error creating history record in DB: ", error.message);
  }
}