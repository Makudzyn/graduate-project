import {
  ADMIN_PANEL_ROUTE,
  LINEAR_GEN_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MATRIX_GEN_ROUTE,
  POLYNOMIALS_ROUTE,
  REGISTRATION_ROUTE,
  SUM_AND_PRODUCT_GEN_ROUTE,
  REGISTER_COMPARISON,
} from "./utils/consts.ts";
import AdminPanel from "./pages/AdminPanel.tsx";
import PolynomialsPage from "./pages/PolynomialsPage.tsx";
import AuthorizationPage from "./pages/AuthorizationPage.tsx";
import LinearGeneratorPage from "./pages/LinearGeneratorPage.tsx";
import MatrixGeneratorPage from "./pages/MatrixGeneratorPage.tsx";
import SumAndProductGeneratorPage from "./pages/SumAndProductGeneratorPage.tsx";
import RegisterComparisonPage from "./pages/RegisterComparisonPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";

export const authRoutes = [
  {
    name: "Admin panel",
    path: ADMIN_PANEL_ROUTE,
    Component: AdminPanel,
  },
  {
    name: "Polynomials list",
    path: POLYNOMIALS_ROUTE,
    Component: PolynomialsPage,
  },
];

export const publicRoutes = [
  {
    name: "Main",
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    name: "Linear-feedback shift register",
    path: LINEAR_GEN_ROUTE,
    Component: LinearGeneratorPage,
  },
  {
    name: "Matrix register",
    path: MATRIX_GEN_ROUTE,
    Component: MatrixGeneratorPage,
  },
  {
    name: "Sum and product register",
    path: SUM_AND_PRODUCT_GEN_ROUTE,
    Component: SumAndProductGeneratorPage,
  },
  {
    name: "Register comparison",
    path: REGISTER_COMPARISON,
    Component: RegisterComparisonPage,
  },
];

export const regAndLoginRoutes = [
  {
    name: "Login",
    path: LOGIN_ROUTE,
    Component: AuthorizationPage,
  },
  {
    name: "Registration",
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
];
