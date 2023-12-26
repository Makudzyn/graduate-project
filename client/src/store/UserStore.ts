import { makeAutoObservable } from "mobx";
export default class UserStore {
  private _isAuth = false;
  private _user: Object = {};
  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: object) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
