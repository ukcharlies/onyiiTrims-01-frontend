import { createBrowserRouter } from "react-router-dom";
import Layout from "./shared/Layout";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default router;
