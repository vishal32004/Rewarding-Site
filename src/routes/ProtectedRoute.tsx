// src/components/routes/ProtectedRoute.tsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Loader from "@/components/Loader";
import { useAppStore } from "@/store/store";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppStore();
  const location = useLocation();

  if (isAuthenticated === undefined) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
