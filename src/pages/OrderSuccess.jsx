import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiCheckCircle,
  HiOutlineHome,
  HiOutlineShoppingBag,
} from "react-icons/hi";

const OrderSuccess = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Generate a random order number for demo purposes
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="container mx-auto max-w-3xl p-4 pt-36 md:pt-40">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <HiCheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Thank you for your purchase
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-2">Your order number:</p>
          <p className="text-2xl font-bold text-dun mb-2">{orderNumber}</p>
          <p className="text-sm text-gray-500">
            You will receive an email confirmation shortly at your registered
            email address.
          </p>
        </div>

        <p className="text-gray-600 mb-8">
          We'll process your order as soon as possible. You can check your order
          status anytime from your account dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-dun hover:bg-dun/90"
          >
            <HiOutlineShoppingBag className="w-5 h-5 mr-2" /> View Your Orders
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <HiOutlineHome className="w-5 h-5 mr-2" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
