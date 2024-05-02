import bigDataIco from "../assets/big-data.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts.ts";
import { FormEvent, useContext, useState } from "react";
import { Context } from "../main.tsx";
import FormInput from "../components/Form/FormInput.tsx";
import FormHeader from "../components/Form/FormHeader.tsx";
import FormButton from "../components/Form/FormButton.tsx";
import FormPassword from "../components/Form/FormPassword.tsx";
import { observer } from "mobx-react-lite";
import { registrationReq } from "../http/userAPI.ts";


const RegistrationPage = observer(() => {
  const { userStore } = useContext(Context)!; // Данные о пользователе из стора
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const navigate = useNavigate();
  async function registrationAttempt(
    e: FormEvent,
    email: string,
    password: string,
    passwordRepeat: string,
  ) {
    e.preventDefault();
    if (password !== passwordRepeat) {
      alert("Паролі не співпадають! Перевірте правельність введення.");
      return;
    }
    if (!email || !password) {
      alert("Порожне поле електронної адреси або паролю.");
      return;
    }
    try {
      let data = await registrationReq(email, password);

      userStore.setUser(data);
      userStore.setIsAuth(true);
      navigate(MAIN_ROUTE, {replace: true});
    } catch (error: any) {
      console.log(error as Error);
      alert("Помилка, реєстрація не була виконана.");
    }
  }

  return (
    <div className="bg-lightBg flex items-center justify-center min-h-screen pt-20 shadow-md shadow-purpleFirst font-poppins">
      <div className="w-full max-w-md p-6 rounded-lg">
        <a
          href="#"
          className="mb-6 flex items-center justify-center text-2xl font-semibold text-gray-900"
        >
          <img className="w-8 h-8 mr-2" src={bigDataIco} alt="logo" />
          Registration
        </a>
        <div className="w-full rounded-lg bg-white shadow-lg shadow-purpleFirst dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FormHeader text="Create new account" />
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
              <FormPassword
                label={"Repeat password"}
                name="passwordRepeat"
                id="passwordRepeat"
                value={passwordRepeat}
                setValue={setPasswordRepeat}
              />


              <FormButton onClick={(e) =>  registrationAttempt(e, email, password, passwordRepeat)}>
                Sign up
              </FormButton>

              <hr />

              <p className="text-sm font-medium text-gray-400">
                Already have an account?
                <NavLink
                  to={LOGIN_ROUTE}
                  className="ml-1 text-purpleFirst hover:underline"
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
});

export default RegistrationPage;
