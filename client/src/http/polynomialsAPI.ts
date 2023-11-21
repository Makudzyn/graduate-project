import { $host } from "./index.ts";

export const fetchPolynomials = async () => {
  const { data } = await $host.get("api/polynomials");
  return data;
};

export const sendLinearGeneratorData = async (
  degreeA: number,
  polynomialArr: string[],
  userValueArr: number[],
  lengthByFormula: number,
) => {
  try {
    const { data } = await $host.post("api/polynomials/compute", {
      degreeA,
      polynomialArr,
      userValueArr,
      lengthByFormula,
    });
    return data;
  } catch (error) {
    throw new Error("Помилка відправки даних для обчислення на сервер");
  }
};

export const sendGeneratedSequence = async (pseudorandomSequence: number[]) => {
  try {
    const { data } = await $host.post(
      "api/polynomials/compute",
      pseudorandomSequence,
    );
    return data;
  } catch (error) {
    throw new Error(
      "Помилка відправки псевдовипадкової послідовності на сервер",
    );
  }
};
