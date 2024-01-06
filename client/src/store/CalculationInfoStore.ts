import { makeAutoObservable } from "mobx";

export default class CalculationInfoStore {
  private _degree: number = 0;
  private _degreeA: number = 0;
  private _degreeB: number = 0;
  private _polynomial: string = "";
  private _polynomialA: string = "";
  private _polynomialB: string = "";
  private _indexI: number = 0;
  private _indexJ: number = 0;
  private _matrixRank: number = 0;
  private _userValue: string = "";
  private _userValueA: string = "";
  private _userValueB: string = "";
  private _hammingBlockLength: number = 0;

  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setManyInputValues(inputValues: {
    degree?: number;
    polynomial?: string;
    degreeA?: number;
    polynomialA?: string;
    degreeB?: number;
    polynomialB?: string;
    indexI?: number;
    indexJ?: number;
    matrixRank?: number;
    userValue?: string;
    userValueA?: string;
    userValueB?: string;
    hammingBlockLength?: number;
  }) {
    inputValues.degree !== undefined && (this._degree = inputValues.degree);
    inputValues.polynomial !== undefined &&
      (this._polynomial = inputValues.polynomial);
    inputValues.degreeA !== undefined && (this._degreeA = inputValues.degreeA);
    inputValues.polynomialA !== undefined &&
      (this._polynomialA = inputValues.polynomialA);
    inputValues.degreeB !== undefined && (this._degreeB = inputValues.degreeB);
    inputValues.polynomialB !== undefined &&
      (this._polynomialB = inputValues.polynomialB);
    inputValues.indexI !== undefined && (this._indexI = inputValues.indexI);
    inputValues.indexJ !== undefined && (this._indexJ = inputValues.indexJ);
    inputValues.matrixRank !== undefined &&
      (this._matrixRank = inputValues.matrixRank);
    inputValues.userValue !== undefined &&
      (this._userValue = inputValues.userValue);
    inputValues.userValueA !== undefined &&
      (this._userValueA = inputValues.userValueA);
    inputValues.userValueB !== undefined &&
      (this._userValueB = inputValues.userValueB);
    inputValues.hammingBlockLength !== undefined &&
      (this._hammingBlockLength = inputValues.hammingBlockLength);
  }

  get allInputValues(): {
    degree: number;
    polynomial: string;
    degreeA: number;
    polynomialA: string;
    degreeB: number;
    polynomialB: string;
    indexI: number;
    indexJ: number;
    matrixRank: number;
    userValue: string;
    userValueA: string;
    userValueB: string;
    hammingBlockLength: number;
  } {
    return {
      degree: this._degree,
      polynomial: this._polynomial,
      degreeA: this._degreeA,
      polynomialA: this._polynomialA,
      degreeB: this._degreeB,
      polynomialB: this._polynomialB,
      indexI: this._indexI,
      indexJ: this._indexJ,
      matrixRank: this._matrixRank,
      userValue: this._userValue,
      userValueA: this._userValueA,
      userValueB: this._userValueB,
      hammingBlockLength: this._hammingBlockLength,
    };
  }
}
