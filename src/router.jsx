import { createBrowserRouter } from "react-router-dom";
import Layout from "./shared/Layout";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutProtectedRoute from "./components/CheckoutProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      {
        path: "/checkout",
        element: (
          <CheckoutProtectedRoute>
            <Checkout />
          </CheckoutProtectedRoute>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/dashboard", element: <Dashboard /> },
          // Add other protected routes here
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
