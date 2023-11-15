import { makeAutoObservable } from "mobx";

export default class CalculationInfoStore {
  private _degreeA: string = "";
  private _degreeB: string = "";
  private _polynomialA: string = "";
  private _polynomialB: string = "";
  private _indexI: string = "";
  private _indexJ: string = "";
  private _matrixRank: string = "";
  private _userValue: string = "";

  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setAllInputValues(
    degreeA: string,
    polynomialA: string,
    degreeB?: string,
    polynomialB?: string,
    indexI?: string,
    indexJ?: string,
    matrixRank?: string,
    userValue?: string,
  ) {
    this._degreeA = degreeA;
    this._polynomialA = polynomialA;
    degreeB && (this._degreeB = degreeB);
    polynomialB && (this._polynomialB = polynomialB);
    indexI && (this._indexI = indexI);
    indexJ && (this._indexJ = indexJ);
    matrixRank && (this._matrixRank = matrixRank);
    userValue && (this._userValue = userValue);
  }

  get allInputValues(): {
    degreeA: string;
    polynomialA: string;
    degreeB: string;
    polynomialB: string;
    indexI: string;
    indexJ: string;
    matrixRank: string;
    userValue: string;
  } {
    return {
      degreeA: this._degreeA,
      polynomialA: this._polynomialA,
      degreeB: this._degreeB,
      polynomialB: this._polynomialB,
      indexI: this._indexI,
      indexJ: this._indexJ,
      matrixRank: this._matrixRank,
      userValue: this._userValue,
    };
  }
}
