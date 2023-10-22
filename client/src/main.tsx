import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore.ts";
import PolynomialsStore from "./store/PolynomialsStore.ts";

type AppContextType = {
    userStore: UserStore;
    polynomialsStore: PolynomialsStore;
};
export const Context = createContext<AppContextType | null>(null);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Context.Provider value={{
              userStore: new UserStore(),
              polynomialsStore: new PolynomialsStore(),
          }}>
              <App />
          </Context.Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
