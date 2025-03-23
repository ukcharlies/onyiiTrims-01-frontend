import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching order details from an API
    setTimeout(() => {
      // Mock order data based on orderId
      // In a real app, this would be an API call to fetch the specific order
      const mockOrders = {
        "ORD-001": {
          id: "ORD-001",
          date: "2023-09-15",
          status: "Delivered",
          total: 125.99,
          shippingAddress: {
            name: "John Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
          },
          paymentMethod: "Credit Card",
          items: [
            {
              id: "1",
              name: "Premium Hair Extension",
              quantity: 2,
              price: 49.99,
              image: "/images/product-placeholder.jpg",
            },
            {
              id: "2",
              name: "Styling Comb Set",
              quantity: 1,
              price: 26.01,
              image: "/images/product-placeholder.jpg",
            },
          ],
        },
        "ORD-002": {
          id: "ORD-002",
          date: "2023-10-02",
          status: "Processing",
          total: 79.5,
          shippingAddress: {
            name: "Jane Smith",
            street: "456 Elm St",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "USA",
          },
          paymentMethod: "PayPal",
          items: [
            {
              id: "3",
              name: "Hair Styling Brush",
              quantity: 1,
              price: 35.5,
              image: "/images/product-placeholder.jpg",
            },
            {
              id: "4",
              name: "Hair Clips (Pack of 12)",
              quantity: 2,
              price: 22.0,
              image: "/images/product-placeholder.jpg",
            },
          ],
        },
        "ORD-003": {
          id: "ORD-003",
          date: "2023-10-18",
          status: "Shipped",
          total: 215.25,
          shippingAddress: {
            name: "Robert Johnson",
            street: "789 Oak St",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            country: "USA",
          },
          paymentMethod: "Credit Card",
          items: [
            {
              id: "5",
              name: "Premium Wig",
              quantity: 1,
              price: 199.99,
              image: "/images/product-placeholder.jpg",
            },
            {
              id: "6",
              name: "Wig Styling Kit",
              quantity: 1,
              price: 15.26,
              image: "/images/product-placeholder.jpg",
            },
          ],
        },
      };

      if (mockOrders[orderId]) {
        setOrder(mockOrders[orderId]);
        setLoading(false);
      } else {
        setError("Order not found");
        setLoading(false);
      }
    }, 1000);
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
          <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p className="text-gray-700 mb-1">{order.shippingAddress.name}</p>
          <p className="text-gray-700 mb-1">{order.shippingAddress.street}</p>
          <p className="text-gray-700 mb-1">
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </p>
          <p className="text-gray-700">{order.shippingAddress.country}</p>
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
          <p className="text-gray-700 mb-1">Items: {order.items.length}</p>
          <p className="text-gray-700 mb-1">
            Total Quantity:{" "}
            {order.items.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <p className="text-gray-700 mb-1">Status: {order.status}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
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
