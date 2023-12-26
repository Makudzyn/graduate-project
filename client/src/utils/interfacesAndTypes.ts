export type PolynomialType = "A" | "B";

export interface Polynomial {
  id: number;
  name: string;
  degree: number;
  polynomial: number;
  createdAt: Date;
  updatedAt: Date;
}
