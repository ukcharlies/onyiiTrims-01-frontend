import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderNumber, transactionId } = location.state || {};

  return (
    <div className="container mx-auto max-w-2xl p-4 pt-36 md:pt-40">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>
        {orderNumber && (
          <p className="mb-2">
            Order Number: <span className="font-semibold">{orderNumber}</span>
          </p>
        )}
        {transactionId && (
          <p className="mb-4">
            Transaction ID:{" "}
            <span className="font-semibold">{transactionId}</span>
          </p>
        )}
        <div className="flex flex-col gap-3 mt-6">
          <Link
            to="/orders"
            className="bg-dun text-white px-6 py-3 rounded-md hover:bg-dun/90 transition-colors"
          >
            View Your Orders
          </Link>
          <Link
            to="/categories"
            className="text-dun hover:text-dun/80 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
