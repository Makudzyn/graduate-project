import "../index.css";
import AppRouter from "./components/AppRouter.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/userAPI.ts";
import { Context } from "./main.tsx";
import Spinner from "./components/Spinner.tsx";
function App() {
  const { userStore } = useContext(Context)!; // Данные о пользователе из стора
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // С помощью функции check проверяем валидность токена, пока проверяем отображается спинер
    check()
      .then((data) => {
        userStore.setUser(data);
        userStore.setIsAuth(true);
      })
      .finally(() => setLoading(false)); // После получения ответа, вне зависимости от него убираем спинер
  }, []);

  if (loading) return <Spinner/>

  return (
    <div className="font-inter font-semibold">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
