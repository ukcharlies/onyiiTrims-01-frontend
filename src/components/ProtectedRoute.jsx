import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading, user } = useGlobal();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, message: "Please login to continue." }}
        replace
      />
    );
  }

  // For admin routes, check if user has admin role
  if (location.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
