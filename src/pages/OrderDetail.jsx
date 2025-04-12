import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { getOrderDetails } from "../services/api"; // Make sure this import exists

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDeliveryTimeText = (method) => {
    switch (method) {
      case "EXPRESS":
        return "1-2 business days";
      case "REGULAR":
        return "3-5 business days";
      case "STANDARD":
        return "5-7 business days";
      case "PICKUP":
        return "Ready for pickup";
      default:
        return "5-7 business days";
    }
  };

  const getBadgeColor = (method) => {
    switch (method) {
      case "EXPRESS":
        return "bg-purple-100 text-purple-800";
      case "REGULAR":
        return "bg-orange-100 text-orange-800";
      case "PICKUP":
        return "bg-gray-100 text-gray-800";
      case "STANDARD":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetails(orderId);

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch order");
        }

        setOrder(response.order);
        setError(null);
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

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dun"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/orders"
            className="px-6 py-3 bg-dun text-white rounded-md hover:bg-dun/90 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            The requested order could not be found.
          </p>
          <Link
            to="/orders"
            className="px-6 py-3 bg-dun text-white rounded-md hover:bg-dun/90 transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-dun hover:text-dun/80 transition-colors"
        >
          <HiArrowLeft className="mr-2" /> Back to Orders
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Order #{order.orderNumber}
          </h1>
          <p className="text-gray-600">
            Placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          {/* Order Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "DELIVERED"
                ? "bg-green-100 text-green-800"
                : order.status === "SHIPPED"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>

          {/* Delivery Method Badge */}
          {order.deliveryMethod && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                order.deliveryMethod
              )}`}
            >
              {order.deliveryMethod.charAt(0) +
                order.deliveryMethod.slice(1).toLowerCase()}
              <span className="ml-1">
                ({getDeliveryTimeText(order.deliveryMethod)})
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p className="text-gray-700 whitespace-pre-line mb-2">
            {order.shippingAddress?.address || "No address provided"}
          </p>
          <p className="text-gray-600">
            Status:{" "}
            <span className="font-medium">
              {order.shippingAddress?.status || "N/A"}
            </span>
          </p>
          {order.shippingAddress?.estimatedDelivery && (
            <p className="text-gray-600 mt-2">
              Estimated Delivery:{" "}
              <span className="font-medium">
                {new Date(
                  order.shippingAddress.estimatedDelivery
                ).toLocaleDateString()}
                {order.deliveryMethod && (
                  <span className="text-sm text-gray-500 ml-1">
                    (
                    {order.deliveryMethod === "EXPRESS"
                      ? "1-2 business days"
                      : order.deliveryMethod === "REGULAR"
                      ? "3-5 business days"
                      : order.deliveryMethod === "PICKUP"
                      ? "Ready for pickup"
                      : "5-7 business days"}
                    )
                  </span>
                )}
              </span>
            </p>
          )}
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <p className="text-gray-700 mb-1">Method: {order.paymentMethod}</p>
          <p className="text-gray-700 mb-1">Total: ₦{order.total.toFixed(2)}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-700 mb-1">
            Items: {order.items?.length || 0}
          </p>
          <p className="text-gray-700 mb-1">
            Total Quantity:{" "}
            {order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0}
          </p>
          <p className="text-gray-700 mb-1">Status: {order.status || "N/A"}</p>
          {order.deliveryMethod && (
            <p className="text-gray-700 mb-1">
              Delivery Method:{" "}
              {`${order.deliveryMethod.charAt(0)}${order.deliveryMethod
                .slice(1)
                .toLowerCase()}`}
              {order.deliveryMethod === "STANDARD" && " (Free)"}
              {order.deliveryMethod === "REGULAR" && " (₦1,000)"}
              {order.deliveryMethod === "EXPRESS" && " (₦5,000)"}
              {order.deliveryMethod === "PICKUP" && " (Free)"}
            </p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="divide-y divide-gray-200">
          {(order.items || []).map((item) => (
            <div key={item.id} className="py-4 flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.image || "/images/product-placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  ₦{(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  ₦{item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex justify-between text-lg">
            <span className="font-bold">Order Total:</span>
            <span className="font-bold">₦{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
