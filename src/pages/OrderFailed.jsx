import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiXCircle } from "react-icons/hi";

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-2xl p-4 pt-36 md:pt-40">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <HiXCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but there was an issue processing your payment. Please
          try again.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-dun text-white px-6 py-3 rounded-md hover:bg-dun/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/contact"
            className="text-dun hover:text-dun/80 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
