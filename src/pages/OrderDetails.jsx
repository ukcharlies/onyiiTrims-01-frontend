import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../services/api";
import { HiArrowLeft } from "react-icons/hi";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetails(orderId);

        // Add debug logging
        console.log("Order details response:", response);

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch order");
        }

        setOrder(response.order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="mb-6">
        <Link
          to="/orders"
          className="flex items-center text-dun hover:text-dun/80 transition-colors"
        >
          <HiArrowLeft className="mr-2" /> Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status === "DELIVERED"
                ? "bg-green-100 text-green-800"
                : order.status === "SHIPPED"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Total Amount: ₦{Number(order.totalAmount).toFixed(2)}</p>
            {order.payment && <p>Payment Status: {order.payment.status}</p>}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
            {order.shipping && (
              <>
                <p>Address: {order.shipping.address}</p>
                <p>Status: {order.shipping.status}</p>
                {order.shipping.trackingNumber && (
                  <p>Tracking: {order.shipping.trackingNumber}</p>
                )}
              </>
            )}
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 text-left">Product</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Unit Price</th>
                <th className="py-2 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4">{item.product.name}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">
                    ₦{Number(item.unitPrice).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    ₦{Number(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
