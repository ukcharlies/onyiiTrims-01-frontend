import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get("status");
    const transaction_id = searchParams.get("transaction_id");

    if (status === "successful" && transaction_id) {
      // Payment successful
      setTimeout(() => {
        navigate("/order/success");
      }, 3000);
    } else {
      // Payment failed
      setTimeout(() => {
        navigate("/order/failed");
      }, 3000);
    }
  }, [searchParams, navigate]);

  const status = searchParams.get("status");
  const isSuccess = status === "successful";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          {isSuccess ? (
            <HiCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <HiXCircle className="mx-auto h-16 w-16 text-red-500" />
          )}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSuccess
              ? "Your order has been successfully placed."
              : "There was an issue processing your payment."}
          </p>
        </div>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dun mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
