import {makeAutoObservable} from "mobx";

export interface Polynomial {
  id: number;
  name: string;
  degree: number;
  polynomial: number;
  createdAt: Date;
  updatedAt: Date;
}
export default class PolynomialsStore {
  private _polynomials:Polynomial[] = [];
  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
                              // и при их изменении компоненты будут перерендериться
  }

  setPolynomials(polynomials: Polynomial[]) {
    this._polynomials = polynomials;
  }

  get polynomials(): Polynomial[] {
    return this._polynomials;
  }
}