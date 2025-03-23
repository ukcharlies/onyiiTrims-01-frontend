import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import FloatingButtons from "../components/FloatingButtons";
import { useGlobal } from "../context/GlobalContext";

const Layout = () => {
  const { darkMode } = useGlobal();

  // Apply dark mode class to body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.add("bg-gray-900");
      document.body.classList.add("text-white");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.remove("text-white");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Layout;
