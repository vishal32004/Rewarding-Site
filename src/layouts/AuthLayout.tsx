import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = () => (
  <div className="auth-layout-wrapper">
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
    <Toaster />
  </div>
);

export default AuthLayout;
