import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.ts";
import {useContext, useState} from "react";
import {Context} from "../main.tsx";
import {login, registration} from "../http/userAPI.ts";
import {observer} from "mobx-react-lite";

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
        <div>
            <div>
                <h2>{isLogin ? "Authorization" : "Registration"}</h2>
                <div>
                    <input
                        placeholder={"Enter your e-mail here..."}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder={"Enter your password here..."}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                    <button onClick={authOrLogin}>
                        {isLogin ? "Sign in" : "Sign up"}
                    </button>

                    {isLogin ?
                        <div>
                            Don't have an account? &nbsp;
                            <NavLink to={REGISTRATION_ROUTE}/>
                        </div>
                        :
                        <div>
                            Sign up
                            <NavLink to={LOGIN_ROUTE}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default AuthorizationPage;