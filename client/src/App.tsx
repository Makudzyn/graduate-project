import "../index.css";
import AppRouter from "./components/AppRouter.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/userAPI.ts";
import {Context} from "./main.tsx";
import spinnerIco from "./assets/spinner.svg";
function App() {
  const {userStore} = useContext(Context)!; // Данные о пользователе из стора
  const [loading, setLoading] = useState(true);

  useEffect(() => { // С помощью функции check проверяем валидность токена, пока проверяем отображается спинер
    check().then(data => {
      userStore.setUser(true);
      userStore.setIsAuth(true);
    }).finally(() => setLoading(false)); // После получения ответа, вне зависимости от него убираем спинер
  }, [])

  if (loading) { // Если loading === true, то есть идет загрузка - отображаем спинер
    return (
      <div className="absolute w-full h-full flex items-center justify-center">
        <svg aria-hidden="true" className="w-16 h-16 mr-2 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <image xlinkHref={spinnerIco} className="w-16 h-16"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <>
        <NavBar/>
        <AppRouter/>
    </>
  )
}

export default App
