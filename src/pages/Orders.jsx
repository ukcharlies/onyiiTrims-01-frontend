import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const Orders = () => {
  const { user } = useGlobal();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders from an API
    setTimeout(() => {
      // Mock order data - in a real app, this would come from your API
      const mockOrders = [
        {
          id: "ORD-001",
          date: "2023-09-15",
          status: "Delivered",
          total: 125.99,
          items: [
            {
              id: "1",
              name: "Premium Hair Extension",
              quantity: 2,
              price: 49.99,
            },
            { id: "2", name: "Styling Comb Set", quantity: 1, price: 26.01 },
          ],
        },
        {
          id: "ORD-002",
          date: "2023-10-02",
          status: "Processing",
          total: 79.5,
          items: [
            { id: "3", name: "Hair Styling Brush", quantity: 1, price: 35.5 },
            {
              id: "4",
              name: "Hair Clips (Pack of 12)",
              quantity: 2,
              price: 22.0,
            },
          ],
        },
        {
          id: "ORD-003",
          date: "2023-10-18",
          status: "Shipped",
          total: 215.25,
          items: [
            { id: "5", name: "Premium Wig", quantity: 1, price: 199.99 },
            { id: "6", name: "Wig Styling Kit", quantity: 1, price: 15.26 },
          ],
        },
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-dun text-white rounded-md hover:bg-dun/90 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dun"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/categories"
            className="px-6 py-3 bg-dun text-white rounded-md hover:bg-dun/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                {orders.map((order) => (
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
                    <td className="py-3 px-4">₦{order.total.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
