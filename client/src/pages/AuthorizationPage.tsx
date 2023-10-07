import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.ts";
import {useContext, useState} from "react";
import {Context} from "../main.tsx";
import {login, registration} from "../http/userAPI.ts";
import {observer} from "mobx-react-lite";
import bigDataIco from "../assets/big-data.svg";


const AuthorizationPage = observer(() => {
    const {userStore} = useContext(Context)!; // Данные о пользователе из стора
    const location = useLocation(); // Хук возвращает объект текущей локации (URL)
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE; // Узнаем на какой странице пользователь - регистрации или входа
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authOrLogin = async () => {
        try {
            let data = {};
            if (isLogin) { // В зависимости от маршрута отображаем форму регистрации или авторизации
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
            <div className={"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"}>
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={bigDataIco} alt="logo"/>
                        {isLogin ? "Authorization" : "Registration"}
                </a>
                <div className={"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"}>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                    placeholder="name@company.com"
                                    required={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-xl"
                                    required={true}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                onClick={authOrLogin}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isLogin ? "Sign in" : "Sign up"}
                            </button>

                            {isLogin ?
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <NavLink
                                        to={REGISTRATION_ROUTE}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                                    >
                                        Sign up here
                                    </NavLink>
                                </p>
                                :
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <NavLink
                                        to={LOGIN_ROUTE}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1"
                                    >
                                        Login here
                                    </NavLink>
                                </p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AuthorizationPage;