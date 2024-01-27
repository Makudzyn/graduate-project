import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts.ts";
import { FormEvent, useContext, useState } from "react";
import { Context } from "../main.tsx";
import { loginReq } from "../http/userAPI.ts";
import { observer } from "mobx-react-lite";
import bigDataIco from "../assets/big-data.svg";
import FormInput from "../components/Inputs/FormInput.tsx";
import FormHeader from "../components/Form/FormHeader.tsx";
import Checkbox from "../components/Inputs/Checkbox.tsx";
import FormButton from "../components/Buttons/FormButton.tsx";
import FormPassword from "../components/Inputs/FormPassword.tsx";

const AuthorizationPage = observer(() => {
  const { userStore } = useContext(Context)!; // Данные о пользователе из стора
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginAttempt(
    e: FormEvent,
    email: string,
    password: string,
  ) {
    e.preventDefault();
    try {
      const data = await loginReq(email, password);

      userStore.setUser(data);
      userStore.setIsAuth(true);
      navigate(MAIN_ROUTE, {replace: true});
    } catch (error: any) {
      console.log(error as Error);
      alert(
        "Помилка. Було введено не вірні данні або такого акаунту не існує.",
      );
    }
  }

  return (
    <div className="bg-lightBg flex items-center justify-center min-h-screen pt-16 shadow-md shadow-purpleFirst font-poppins">
      <div className="w-full max-w-md p-6 rounded-lg">
        <a
          href="#"
          className="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"
        >
          <img className="mr-2 h-8 w-8" src={bigDataIco} alt="logo" />
          Authorization
        </a>
        <div className="w-full rounded-lg bg-white shadow-lg shadow-purpleFirst dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
            <FormHeader text="Sign in to your account" />
            <form className="space-y-4 md:space-y-6">
              <FormInput
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                value={email}
                setValue={setEmail}
              />
              <FormPassword
                label="Password"
                name="password"
                id="password"
                value={password}
                setValue={setPassword}
              />
              <div className="flex items-center justify-between">
                <Checkbox id="remember" label="Remember me" />
                <a
                  href="#"
                  className="text-sm font-medium text-purpleFirst hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <FormButton onClick={e => loginAttempt(e, email, password)}>
                Sign in
              </FormButton>

              <hr />

              <p className="text-sm font-medium text-gray-400">
                Don’t have an account yet?
                <NavLink
                  to={REGISTRATION_ROUTE}
                  className="ml-1 text-purpleFirst hover:underline"
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
