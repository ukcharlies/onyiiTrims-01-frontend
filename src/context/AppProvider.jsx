import React from "react";
import { GlobalProvider } from "./GlobalContext";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppProvider = ({ children }) => {
  return (
    <GlobalProvider>
      <CartProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </CartProvider>
    </GlobalProvider>
  );
};
