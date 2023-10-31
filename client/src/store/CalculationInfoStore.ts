import { makeAutoObservable } from "mobx";

export default class CalculationInfoStore {
  private _degree: string = "";
  private _polynomial: string = "";
  private _userValue: string = "";

  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setDegree(degree: string) {
    this._degree = degree;
  }

  get degree(): string {
    return this._degree;
  }

  setPolynomial(polynomial: string) {
    this._polynomial = polynomial;
  }

  get polynomial(): string {
    return this._polynomial;
  }

  setUserValue(userValue: string) {
    this._userValue = userValue;
  }

  get userValue(): string {
    return this._userValue;
  }

  setAllInputValues(degree: string, polynomial: string, userValue: string) {
    this._degree = degree;
    this._polynomial = polynomial;
    this._userValue = userValue;

  }

  get allInputValues(): { degree: string, polynomial: string, userValue: string} {
    return {
      degree: this._degree,
      polynomial: this._polynomial,
      userValue: this._userValue,
    };
  }
}
