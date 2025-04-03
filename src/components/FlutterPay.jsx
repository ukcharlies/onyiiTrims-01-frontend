import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { confirmPayment } from "../services/api";
import { useGlobal } from "../context/GlobalContext"; // Add this import

const FlutterPay = ({ amount, orderNumber, orderId }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useGlobal(); // Now useGlobal is properly imported

  const handlePaymentSuccess = async (response) => {
    try {
      console.log("Payment response:", response);
      window.paymentSuccess = false; // Reset payment status

      if (response.status === "successful") {
        // Log the data being sent to confirmPayment
        const paymentData = {
          orderId,
          transactionId: String(response.transaction_id), // Convert to string
          status: response.status,
        };
        console.log("Sending payment confirmation data:", paymentData);

        const confirmResponse = await confirmPayment(paymentData);
        console.log("Confirmation response:", confirmResponse);

        if (confirmResponse.success) {
          window.paymentSuccess = true;
          clearCart();
          navigate("/order/success", {
            state: {
              orderNumber,
              transactionId: response.transaction_id,
            },
            replace: true,
          });
        } else {
          console.error(
            "Payment confirmation failed response:",
            confirmResponse
          );
          throw new Error(
            confirmResponse.message || "Payment confirmation failed"
          );
        }
      } else {
        throw new Error(`Payment status: ${response.status}`);
      }
    } catch (error) {
      console.error("Payment confirmation failed:", error);
      window.paymentSuccess = false;
      navigate("/order/failed", {
        state: { error: error.message },
        replace: true,
      });
    }
    closePaymentModal();
  };

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: orderNumber,
    amount: parseFloat(amount),
    currency: "NGN",
    payment_options: "card", // Limit to card only for testing
    customer: {
      email: user?.email || "",
      phone_number: user?.phoneNumber || "", // Changed from phoneNumber to match schema
      name: `${user?.firstName || ""} ${user?.lastName || ""}`,
    },
    customizations: {
      title: "OnyiTrims Payment",
      description: `Payment for order ${orderNumber}`,
      logo: "/logo_idea_2-removebg-preview.png", // Update path to be relative to public
    },
    callback: handlePaymentSuccess,
    onClose: () => {
      console.log("Payment modal closed");
      // Only navigate to failed if payment wasn't successful
      if (!window.paymentSuccess) {
        navigate("/order/failed", { replace: true });
      }
    },
  };

  // Add error boundary
  if (!config.public_key) {
    console.error("Flutterwave public key is missing");
    return (
      <div className="text-red-500 text-center p-4">
        Payment system configuration error. Please contact support.
      </div>
    );
  }

  // Add debug logging
  console.log("FlutterPay Config:", {
    amount,
    orderNumber,
    orderId,
    publicKey: config.public_key ? "Present" : "Missing",
  });

  // Add test card info notice
  return (
    <div className="w-full">
      {config.public_key ? (
        <>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold mb-2">Test Card Details:</h4>
            <p>Card Number: 4187 4274 1556 4246</p>
            <p>CVV: 828</p>
            <p>Expiry: 09/32</p>
            <p>PIN: 3310</p>
            <p>OTP: 12345</p>
          </div>
          <FlutterWaveButton
            {...config}
            text="Proceed to Payment"
            className="w-full bg-dun text-white py-2 px-4 rounded hover:bg-opacity-90 transition-all duration-300"
          />
        </>
      ) : (
        <div className="text-red-500 text-center p-4">
          Payment system configuration error. Please contact support.
        </div>
      )}
    </div>
  );
};

export default FlutterPay;
