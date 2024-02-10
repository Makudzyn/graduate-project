import { makeAutoObservable } from "mobx";
import { User } from "../utils/interfacesAndTypes.ts";
export default class UserStore {
  private _isAuth = false;
  private _user: User = {
    id: 0,
    email: "",
    password: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  constructor() {
    makeAutoObservable(this); // Для того чтобы Mobx следил за изменениями переменных
    // и при их изменении компоненты будут перерендериться
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: User) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
