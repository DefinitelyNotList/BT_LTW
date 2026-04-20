import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirectPath = `${location.pathname}${location.search}`;
    return <Navigate replace to={`/login?redirect=${encodeURIComponent(redirectPath)}`} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
