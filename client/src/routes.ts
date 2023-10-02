import {
    ADMIN_PANEL_ROUTE,
    LINEAR_GEN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MATRIX_GEN_ROUTE,
    POLYNOMIALS_ROUTE,
    REGISTRATION_ROUTE,
    SUM_AND_MULTI_GEN_ROUTE,
    UNTITLED_ROUTE
} from "./utils/consts.ts";
import AdminPanel from "./pages/AdminPanel.tsx";
import PolynomialsPage from "./pages/PolynomialsPage.tsx";
import AuthorizationPage from "./pages/AuthorizationPage.tsx";
import LinearGeneratorPage from "./pages/LinearGeneratorPage.tsx";
import MatrixGeneratorPage from "./pages/MatrixGeneratorPage.tsx";
import SumAndMultiGeneratorPage from "./pages/SumAndMultiGeneratorPage.tsx";
import untitledGenerator from "./pages/untitledGenerator.tsx";
import MainPage from "./pages/MainPage.tsx";

export const authRoutes = [
    {
        path: ADMIN_PANEL_ROUTE,
        Component: AdminPanel
    },
    {
        path: POLYNOMIALS_ROUTE,
        Component: PolynomialsPage
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthorizationPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthorizationPage
    },
    {
        path: LINEAR_GEN_ROUTE,
        Component: LinearGeneratorPage
    },
    {
        path: MATRIX_GEN_ROUTE,
        Component: MatrixGeneratorPage
    },
    {
        path: SUM_AND_MULTI_GEN_ROUTE,
        Component: SumAndMultiGeneratorPage
    },
    {
        path: UNTITLED_ROUTE,
        Component: untitledGenerator
    },
]