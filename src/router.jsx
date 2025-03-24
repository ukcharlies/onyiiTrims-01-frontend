import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./shared/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import SubcategoryProducts from "./pages/SubcategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutProtectedRoute from "./components/CheckoutProtectedRoute";

// This component will fetch categories and redirect to the first one
const CategoriesRedirect = () => {
  return <Categories />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // Protected routes that require authentication
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          // Order routes
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/:orderId",
            element: <OrderDetail />,
          },
        ],
      },
      // Checkout routes - must be authenticated
      {
        path: "checkout",
        element: (
          <CheckoutProtectedRoute>
            <Checkout />
          </CheckoutProtectedRoute>
        ),
      },
      {
        path: "checkout/success",
        element: (
          <CheckoutProtectedRoute>
            <OrderSuccess />
          </CheckoutProtectedRoute>
        ),
      },
      // Categories routes
      {
        path: "categories",
        element: <CategoriesRedirect />,
      },
      {
        path: "categories/:categoryId",
        element: <Categories />,
      },
      {
        path: "subcategories/:subcategoryId",
        element: <SubcategoryProducts />,
      },
      // Product details route
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;
