import { makeAutoObservable } from "mobx";
import { Polynomial } from "../utils/interfacesAndTypes.ts";

export default class PolynomialsStore {
  private _polynomials: Polynomial[] = [];
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
