import {
  ADMIN_PANEL_ROUTE,
  LINEAR_GEN_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MATRIX_GEN_ROUTE,
  POLYNOMIALS_ROUTE,
  REGISTRATION_ROUTE,
  SUM_AND_PRODUCT_GEN_ROUTE,
  REGISTER_COMPARISON_ROUTE, FROBENIUS_GEN_ROUTE
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
import FrobeniusPage from "./pages/FrobeniusPage.tsx";

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
    name: "LFSR",
    path: LINEAR_GEN_ROUTE,
    Component: LinearGeneratorPage,
  },
  {
    name: "MSR",
    path: MATRIX_GEN_ROUTE,
    Component: MatrixGeneratorPage,
  },
  {
    name: "Sum and product",
    path: SUM_AND_PRODUCT_GEN_ROUTE,
    Component: SumAndProductGeneratorPage,
  },
  {
    name: "Comparison",
    path: REGISTER_COMPARISON_ROUTE,
    Component: RegisterComparisonPage,
  },
  {
    name: "Frobenius",
    path: FROBENIUS_GEN_ROUTE,
    Component: FrobeniusPage,
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
