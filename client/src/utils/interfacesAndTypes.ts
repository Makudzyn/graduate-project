export type PolynomialType = "A" | "B";

export type BooleanSelect = {
  booleanLabel: string;
  booleanValue: boolean;
};
export interface Polynomial {
  id: number;
  degree: number;
  name: string;
  polynomial: string;
  createdAt: Date;
  updatedAt: Date;
}
