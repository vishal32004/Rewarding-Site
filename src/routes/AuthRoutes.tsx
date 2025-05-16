// src/routes/AuthRoutes.tsx
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { Navigate } from "react-router-dom";
import { useAppStore } from "@/store/store";
import ForgotPassword from "@/pages/Authentication/ForgotPassword";

const Login = lazy(() => import("@/pages/Authentication/Login"));
const SignUp = lazy(() => import("@/pages/Authentication/SignUp"));
const ThankYouForRequest = lazy(() => import("@/pages/ThankYouForRequesting"));

const AuthRouteElement = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAppStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

const AuthRoutes: RouteObject = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <AuthRouteElement element={<Login />} />,
    },
    {
      path: "signup",
      element: <AuthRouteElement element={<SignUp />} />,
    },
    {
      path: "forgot-password",
      element: <AuthRouteElement element={<ForgotPassword />} />,
    },
    {
      path: "thank-you-for-request",
      element: <AuthRouteElement element={<ThankYouForRequest />} />,
    },
  ],
};

export default AuthRoutes;
