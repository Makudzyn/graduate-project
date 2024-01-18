import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts.ts";
import { useContext, useState } from "react";
import { Context } from "../main.tsx";
import { login, registration } from "../http/userAPI.ts";
import { observer } from "mobx-react-lite";
import bigDataIco from "../assets/big-data.svg";
import FormInput from "../components/Inputs/FormInput.tsx";
import FormHeader from "../components/Form/FormHeader.tsx";
import Checkbox from "../components/Inputs/Checkbox.tsx";

const AuthorizationPage = observer(() => {
  const { userStore } = useContext(Context)!; // Данные о пользователе из стора
  const location = useLocation(); // Хук возвращает объект текущей локации (URL)
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE; // Узнаем на какой странице пользователь - регистрации или входа
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function authOrLogin() {
    try {
      let data = {};
      if (isLogin) {
        // В зависимости от маршрута отображаем форму регистрации или авторизации
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      userStore.setUser(data);
      userStore.setIsAuth(true);
      navigate(MAIN_ROUTE);
    } catch (e) {
      alert("Error");
    }
  }

  return (
    <div className={"bg-gray-50 dark:bg-gray-900 font-sans"}>
      <div
        className={
          "flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        }
      >
        <a
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2 h-8 w-8" src={bigDataIco} alt="logo" />
          Authorization
        </a>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
            <FormHeader text="Sign in to your account" />
            <form className="space-y-4 md:space-y-6" action="#">
              <FormInput
                label={"Email"}
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                value={email}
                setValue={setEmail}
              />
              <FormInput
                label={"Password"}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                setValue={setPassword}
              />
              <div className="flex items-center justify-between">
                <Checkbox id="remember" label="Remember me" />
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={authOrLogin}
                className="w-full rounded-lg px-5 text-center text-sm font-medium text-white bg-primary-600 py-2.5 hover:bg-primary-700 focus:ring-primary-300 focus:outline-none focus:ring-4 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <NavLink
                  to={REGISTRATION_ROUTE}
                  className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthorizationPage;
