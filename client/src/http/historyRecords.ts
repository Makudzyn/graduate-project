import { $authHost } from "./index.ts";

export const sendHistoryRecord = async (
  userId: number,
  pageName: string,
  parameters: string,
) => {
  try {
    const {data} = await $authHost.post("api/history/save-in-history", {
      userId,
      pageName,
      parameters
    });
    return data;
  } catch (error) {
    throw new Error("Error sending history record on server.");
  }
};