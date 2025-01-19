import { $authHost } from './index.ts';

export const fetchHistoryList = async () => {
  try {
    const { data } = await $authHost.get('api/history/get-history-list');
    return data;
  } catch (error) {
    throw new Error('Помилка отримання даних історії з сервера.');
  }
};
export const createHistoryRecordRequest = async (
  userId: number,
  pageName: string,
  parameters: string,
) => {
  try {
    const { data } = await $authHost.post('api/history/save-in-history', {
      userId,
      pageName,
      parameters,
    });
    return data;
  } catch (error) {
    throw new Error(
      'Помилка відправки даних на сервер для створення запису історії.',
    );
  }
};

export const deleteHistoryRecordRequest = async (recordId: number) => {
  try {
    const { data } = await $authHost.delete('api/history/delete-one-record', {
      params: {
        id: recordId,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Помилка видалення запису історії з серверу.');
  }
};

export const deleteAllHistoryRecordsRequest = async (
  userId: number,
  pageName: string,
) => {
  try {
    const { data } = await $authHost.delete(
      'api/history/delete-all-page-records',
      {
        params: {
          userId,
          pageName,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('Помилка видалення усіх записів історії з серверу.');
  }
};
