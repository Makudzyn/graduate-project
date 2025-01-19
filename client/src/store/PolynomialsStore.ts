import { makeAutoObservable } from 'mobx';
import { Polynomial } from '../utils/interfacesAndTypes.ts';

export default class PolynomialsStore {
  private _polynomials: Polynomial[] = [];
  private _totalCount: number = 0;
  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount;
  }
  setPolynomials(polynomials: Polynomial[]) {
    this._polynomials = polynomials;
  }

  get totalCount(): number {
    return this._totalCount;
  }
  get polynomials(): Polynomial[] {
    return this._polynomials;
  }
}
