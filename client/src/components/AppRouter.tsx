import { Route, Routes, Navigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts.ts';
import { authRoutes, publicRoutes, regAndLoginRoutes } from '../routes.ts';
import { useContext } from 'react';
import { Context } from '../main.tsx';

const AppRouter = () => {
  const { userStore } = useContext(Context)!; // User data from the store
  return (
    <Routes>
      {/* If the user is authorized, output additional routes */}
      {userStore.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {/* If the user is not authorized, he receives only public routes */}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {regAndLoginRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      {/* If the user goes to an undefined path redirect to the main page */}
      <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
