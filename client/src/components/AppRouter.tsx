import {Route, Routes, Navigate} from 'react-router-dom';
import {MAIN_ROUTE} from "../utils/consts.ts";
import {AuthRoutes, authRoutes, publicRoutes} from "../routes.ts";
import {useContext} from "react";
import {Context} from "../main.tsx";

const AppRouter = () => {
    const {userStore} = useContext(Context)!; // Данные о пользователе из стора
    return (
        <Routes>
            {/*Если пользователь авторизирован выводим дополнительные маршруты*/}
            {userStore.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}

            {/*Если пользователь не авторизирован он получает только публичные маршруты*/}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {AuthRoutes.map(({path, Component}) =>
              <Route key={path} path={path} element={<Component/>}/>
            )}

            {/*Если пользователь переходит по неопределенному пути редиректим на главную страницу*/}
            <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
        </Routes>
    )
}

export default AppRouter;