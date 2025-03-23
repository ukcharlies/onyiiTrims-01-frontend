import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useGlobal();
  const { cartItems, getCartTotal } = useCart();

  // Function to open cart drawer
  const openCartDrawer = () => {
    // Find the cart button in the navbar and click it
    const cartButton = document.querySelector('[aria-label="Open cart"]');
    if (cartButton) {
      cartButton.click();
    }
  };

  // Mock order data
  const recentOrders = [
    { id: "ORD-001", date: "2023-09-15", status: "Delivered", total: 125.99 },
    { id: "ORD-002", date: "2023-10-02", status: "Processing", total: 79.5 },
    { id: "ORD-003", date: "2023-10-18", status: "Shipped", total: 215.25 },
  ];

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome Back, {user?.firstName}
          </h2>
          <p className="text-gray-600 mb-2">
            Name: {user?.firstName} {user?.lastName}
          </p>
          <p className="text-gray-600 mb-4">Email: {user?.email}</p>
          <Link
            to="/profile"
            className="text-dun hover:underline transition-colors"
          >
            View Profile
          </Link>
        </div>

        {/* Cart Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
          ) : (
            <>
              <div className="max-h-40 overflow-y-auto mb-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 text-sm"
                  >
                    <div className="flex-1 truncate">
                      <span className="font-medium">{item.quantity}x</span>{" "}
                      {item.name}
                    </div>
                    <div className="pl-2 text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-2 mb-3">
                <p className="text-lg font-medium flex justify-between">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </p>
              </div>
            </>
          )}

          <div className="flex gap-2">
            {cartItems.length > 0 && (
              <>
                <button
                  onClick={openCartDrawer}
                  className="inline-block px-4 py-2 bg-dun text-white rounded hover:bg-dun/90 transition-colors"
                >
                  View Cart
                </button>
                <Link
                  to="/checkout"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Checkout
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="mb-2">Total Orders: {recentOrders.length}</p>
          <p className="mb-4">Last Order: {recentOrders[0]?.date}</p>
          <Link
            to="/orders"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View
                    </Link>
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

export default Dashboard;
