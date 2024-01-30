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

export type PolynomialWithoutDate = Omit<Polynomial, keyof { createdAt: Date; updatedAt: Date }>;

export interface SortState {
  column: keyof PolynomialWithoutDate;
  order: "ascending" | "descending";
}
