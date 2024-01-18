import bigDataIco from "../assets/big-data.svg";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts.ts";
import { useContext, useState } from "react";
import { Context } from "../main.tsx";
import FormInput from "../components/Inputs/FormInput.tsx";
import FormHeader from "../components/Form/FormHeader.tsx";

interface RegistrationPageProps {}

const RegistrationPage = ({}: RegistrationPageProps) => {
  const { userStore } = useContext(Context)!; // Данные о пользователе из стора
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={bigDataIco} alt="logo" />
          Registration
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FormHeader text="Create new account" />
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
              <FormInput
                label={"Repeat password"}
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                placeholder="••••••••"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
              />

              <hr />

              <button className="w-full text-white bg-primary-600 bg-main-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign up
              </button>

              <hr />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <NavLink
                  to={LOGIN_ROUTE}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
