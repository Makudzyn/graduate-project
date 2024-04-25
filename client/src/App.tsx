import "../index.css";
import AppRouter from "./components/AppRouter.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import { useContext, useEffect, useState } from "react";
import { check } from "./http/userAPI.ts";
import { Context } from "./main.tsx";
import Spinner from "./components/Spinner.tsx";
function App() {
  const { userStore } = useContext(Context)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        userStore.setUser(data);
        userStore.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner/>

  return (
    <div className="font-inter">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
