import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  createProduct,
  deleteProduct, // Add this
  getCategories, // Add this
  getSubcategoriesByCategory, // Add this
} from "../services/api";

const AdminDashboard = () => {
  const { user } = useGlobal();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    subcategoryId: "",
    images: [],
  });
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "ADMIN") {
      navigate("/dashboard");
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, ordersData, productsData] = await Promise.all([
        getAllUsers(),
        getAllOrders(),
        getAllProducts(),
      ]);
      setUsers(usersData);
      setOrders(ordersData);
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const data = await getSubcategoriesByCategory(selectedCategory);
          setSubcategories(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/newsletter/subscribers`
        );
        if (!response.ok) throw new Error("Failed to fetch subscribers");
        const data = await response.json();
        setSubscribers(data);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      }
    };

    if (activeTab === "newsletter") {
      fetchSubscribers();
    }
  }, [activeTab]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("subcategoryId", newProduct.subcategoryId);

      // Add images
      if (newProduct.images && newProduct.images.length > 0) {
        Array.from(newProduct.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await createProduct(formData);
      console.log("Product created:", response);

      await fetchData(); // Refresh products list

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        subcategoryId: "",
        images: [],
      });
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product.id !== productId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleViewOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto max-w-7xl p-4 pt-36 md:pt-40">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "users" ? "bg-dun text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "orders" ? "bg-dun text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Manage Orders
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "products" ? "bg-dun text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Manage Products
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "newsletter" ? "bg-dun text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("newsletter")}
          >
            Newsletter
          </button>
        </div>
      </div>

      {activeTab === "users" ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUserRole(user.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="CUSTOMER">Customer</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "orders" ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Order Number</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3">{order.orderNumber}</td>
                    <td className="p-3">
                      {order.user.firstName} {order.user.lastName}
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3">
                      ₦{Number(order.totalAmount).toFixed(2)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleViewOrderDetails(order.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === "products" ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Product Management</h2>

          {/* Add Product Form */}
          <form onSubmit={handleAddProduct} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      images: Array.from(e.target.files),
                    })
                  }
                  className="w-full border rounded p-2"
                  accept="image/*"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Subcategory</label>
                <select
                  value={newProduct.subcategoryId}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      subcategoryId: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                  disabled={!selectedCategory}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  rows="3"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-dun text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </form>

          {/* Products List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">₦{Number(product.price).toFixed(2)}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        activeTab === "newsletter" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Newsletter Subscribers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Subscribed Date</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b">
                      <td className="p-3">{subscriber.email}</td>
                      <td className="p-3">
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded ${
                            subscriber.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {subscriber.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AdminDashboard; // Keep only one export statement
