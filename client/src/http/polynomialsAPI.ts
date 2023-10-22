import {$host} from "./index.ts";

export const fetchPolynomials = async () => {
  const {data} = await $host.get('api/polynomials');
  return data;
}