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
import OrderFailed from "./pages/OrderFailed";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckoutProtectedRoute from "./components/CheckoutProtectedRoute";
import Shop from "./pages/Shop";
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./pages/AdminDashboard";
import ProductEdit from "./pages/ProductEdit"; // Add this import

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
        path: "shop",
        element: <Shop />,
      },
      {
        path: "search",
        element: <SearchResults />,
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
          // Admin route
          {
            path: "admin",
            element: <AdminDashboard />,
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
          // Add product edit route (must be admin)
          {
            path: "products/:productId/edit",
            element: <ProductEdit />,
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
      {
        path: "order/success",
        element: <OrderSuccess />,
      },
      {
        path: "order/failed",
        element: <OrderFailed />,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
