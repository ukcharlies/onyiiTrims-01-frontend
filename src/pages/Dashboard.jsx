import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";
import { getUserOrders } from "../services/api";

const Dashboard = () => {
  const { user } = useGlobal();
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if we're in Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Only redirect if user exists and is admin
    if (user?.role === "ADMIN") {
      // For Safari, ensure auth headers are prepared
      if (isSafari) {
        // Ensure admin token is available for API requests
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
          console.log(
            "Admin token available for Safari: preparing admin access"
          );

          // Wait slightly longer to ensure token is properly stored
          const timer = setTimeout(() => {
            navigate("/admin", { replace: true });
          }, 1200);

          return () => clearTimeout(timer);
        }
      } else {
        navigate("/admin", { replace: true });
      }
    }

    // For regular users in Safari, verify session
    if (isSafari && user) {
      // Ensure auth token is properly set
      const authToken = localStorage.getItem("authToken");
      if (!authToken && user.id) {
        console.log("Safari user session needs reinforcement");
        localStorage.setItem(
          "authToken",
          localStorage.getItem("adminToken") || ""
        );
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userId", user.id);
      }
    }

    // Ensure authentication is properly set before fetching orders
    const prepareAndFetchOrders = async () => {
      if (!user) return;

      // Make sure token is available
      const token = localStorage.getItem("authToken");
      if (!token) {
        // If we have user data but no token, store critical info in localStorage
        localStorage.setItem("userRole", user.role || "CUSTOMER");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userEmail", user.email);

        // Try to extract token from cookie
        const cookieToken = document.cookie.replace(
          /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        if (cookieToken) {
          localStorage.setItem("authToken", cookieToken);
        }
      }

      // Now fetch orders
      try {
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!user?.role || user.role === "USER" || user.role === "CUSTOMER") {
      prepareAndFetchOrders();
    }
  }, [user, navigate]);

  // Function to open cart drawer
  const openCartDrawer = () => {
    // Find the cart button in the navbar and click it
    const cartButton = document.querySelector('[aria-label="Open cart"]');
    if (cartButton) {
      cartButton.click();
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Welcome Back, {user?.firstName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Name: {user?.firstName} {user?.lastName}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Email: {user?.email}
          </p>
          <Link
            to="/profile"
            className="text-dun dark:text-[#607466] hover:underline transition-colors"
          >
            View Profile
          </Link>
        </div>

        {/* Cart Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Cart Summary
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="max-h-40 overflow-y-auto mb-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2 text-sm"
                  >
                    <div className="flex-1 truncate text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{item.quantity}x</span>{" "}
                      {item.name}
                    </div>
                    <div className="pl-2 text-gray-700 dark:text-gray-300">
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mb-3">
                <p className="text-lg font-medium flex justify-between text-gray-800 dark:text-white">
                  <span>Total:</span>
                  <span>₦{getCartTotal().toFixed(2)}</span>
                </p>
              </div>
            </>
          )}

          <div className="flex gap-2">
            {cartItems.length > 0 && (
              <>
                <button
                  onClick={openCartDrawer}
                  className="inline-block px-4 py-2 bg-dun dark:bg-[#607466] text-white rounded hover:bg-dun/90 dark:hover:bg-[#607466]/90 transition-colors"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Order Summary
          </h2>
          {loading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p className="mb-2 text-gray-600 dark:text-gray-300">
                Total Orders: {orders.length}
              </p>
              {orders.length > 0 ? (
                <>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Last Order:{" "}
                    {new Date(orders[0].createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to="/orders"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    View All Orders
                  </Link>
                </>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  You haven't placed any orders yet.
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-600 dark:text-gray-300">
              Loading orders...
            </p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              You have no orders yet. Start shopping to see your order history
              here.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-4 text-left text-gray-800 dark:text-white">
                    Order Number
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 dark:text-white">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 dark:text-white">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 dark:text-white">
                    Total
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      ₦{Number(order.totalAmount).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
