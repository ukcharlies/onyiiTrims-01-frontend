import { Navigate, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

// This component is specifically for checkout redirection
const CheckoutProtectedRoute = ({ children }) => {
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

  // Redirect to login if not authenticated, saving the current checkout URL
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please login to continue with your purchase.",
        }}
        replace
      />
    );
  }

  // If authenticated, render the children
  return children;
};

export default CheckoutProtectedRoute;
