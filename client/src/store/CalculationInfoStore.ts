import { makeAutoObservable } from "mobx";

export default class CalculationInfoStore {
  private _degreeA: string = "";
  private _degreeB: string = "";
  private _polynomialA: string = "";
  private _polynomialB: string = "";
  private _userValue: string = "";

  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setDegreeA(degree: string) {
    this._degreeA = degree;
  }
  setDegreeB(degree: string) {
    this._degreeB = degree;
  }

  get degreeA(): string {
    return this._degreeA;
  }

  get degreeB(): string {
    return this._degreeB;
  }

  setPolynomialA(polynomial: string) {
    this._polynomialA = polynomial;
  }
  setPolynomialB(polynomial: string) {
    this._polynomialB = polynomial;
  }

  get polynomialA(): string {
    return this._polynomialA;
  }
  get polynomialB(): string {
    return this._polynomialB;
  }

  setUserValue(userValue: string) {
    this._userValue = userValue;
  }

  get userValue(): string {
    return this._userValue;
  }

  setAllInputValues(
    degreeA: string,
    polynomialA: string,
    degreeB?: string,
    polynomialB?: string,
    userValue?: string,
  ) {
    this._degreeA = degreeA;
    this._polynomialA = polynomialA;
    degreeB && (this._degreeB = degreeB);
    polynomialB && (this._polynomialB = polynomialB);
    userValue && (this._userValue = userValue);
  }

  get allInputValues(): {
    degreeA: string,
    polynomialA: string,
    degreeB: string,
    polynomialB: string,
    userValue: string,
  } {
    return {
      degreeA: this._degreeA,
      polynomialA: this._polynomialA,
      degreeB: this._degreeB,
      polynomialB: this._polynomialB,
      userValue: this._userValue
    };
  }
}
