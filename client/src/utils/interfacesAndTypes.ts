export type PolynomialType = "A" | "B";

export type BooleanSelect = {
  booleanLabel: string;
  booleanValue: boolean;
};
export interface Polynomial {
  id: number;
  name: string;
  degree: number;
  polynomial: number;
  createdAt: Date;
  updatedAt: Date;
}
