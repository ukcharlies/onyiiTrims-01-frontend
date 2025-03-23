import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useGlobal();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated, saving the current location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
