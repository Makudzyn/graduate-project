import {
    ADMIN_PANEL_ROUTE,
    LINEAR_GEN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MATRIX_GEN_ROUTE,
    POLYNOMIALS_ROUTE,
    REGISTRATION_ROUTE,
    SUM_AND_MULTI_GEN_ROUTE,
    HAMMING_WEIGHT_ANALYSIS_ROUTE
} from "./utils/consts.ts";
import AdminPanel from "./pages/AdminPanel.tsx";
import PolynomialsPage from "./pages/PolynomialsPage.tsx";
import AuthorizationPage from "./pages/AuthorizationPage.tsx";
import LinearGeneratorPage from "./pages/LinearGeneratorPage.tsx";
import MatrixGeneratorPage from "./pages/MatrixGeneratorPage.tsx";
import SumAndMultiGeneratorPage from "./pages/SumAndMultiGeneratorPage.tsx";
import untitledGenerator from "./pages/HammingWeightAnalysisPage.tsx";
import MainPage from "./pages/MainPage.tsx";

export const authRoutes = [
    {
        name: "Admin panel",
        path: ADMIN_PANEL_ROUTE,
        Component: AdminPanel
    },
    {
        name: "Polynomials list",
        path: POLYNOMIALS_ROUTE,
        Component: PolynomialsPage
    },
]

export const publicRoutes = [
    {
        name: "Main",
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        name: "Linear-feedback shift register",
        path: LINEAR_GEN_ROUTE,
        Component: LinearGeneratorPage
    },
    {
        name: "Matrix register",
        path: MATRIX_GEN_ROUTE,
        Component: MatrixGeneratorPage
    },
    {
        name: "Sum and multiplication register",
        path: SUM_AND_MULTI_GEN_ROUTE,
        Component: SumAndMultiGeneratorPage
    },
    {
        name: "Untitled",
        path: HAMMING_WEIGHT_ANALYSIS_ROUTE,
        Component: untitledGenerator
    },
]

export const regAndLoginRoutes = [
    {
        name: "Login",
        path: LOGIN_ROUTE,
        Component: AuthorizationPage
    },
    {
        name: "Registration",
        path: REGISTRATION_ROUTE,
        Component: AuthorizationPage
    },
]