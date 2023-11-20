import { $host } from "./index.ts";

export const fetchPolynomials = async () => {
  const { data } = await $host.get("api/polynomials");
  return data;
};

export const sendGeneratedData = async (pseudorandomSequence: number[]) => {
  try {
    const { data } = await $host.post("api/polynomials/compute", pseudorandomSequence);
    return data; // Возвращаем полученные данные от сервера
  } catch (error) {
    throw new Error("Ошибка отправки данных на сервер"); // Обрабатываем ошибку запроса
  }
};
