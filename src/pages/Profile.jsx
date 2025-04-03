import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, isAuthenticated, logout, updateUser } = useGlobal();
  const { cartItems, getCartTotal } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "", // Changed from phone to phoneNumber
    address: user?.address || "",
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    toast.info("You've been logged out");
  };
  // Function to open cart drawer
  const openCartDrawer = () => {
    // Find the cart button in the navbar and click it
    const cartButton = document.querySelector('[aria-label="Open cart"]');
    if (cartButton) {
      cartButton.click();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 pt-36 md:pt-40">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Profile
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Information Section */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {!isEditing ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Profile Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-dun dark:bg-[#607466] text-white rounded hover:bg-dun/90 dark:hover:bg-[#607466]/90 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {user?.phoneNumber || "Not provided"}{" "}
                      {/* Changed from phone to phoneNumber */}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {user?.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Edit Profile
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dun dark:focus:border-[#607466] focus:ring-dun dark:focus:ring-[#607466] dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dun dark:focus:border-[#607466] focus:ring-dun dark:focus:ring-[#607466] dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dun dark:focus:border-[#607466] focus:ring-dun dark:focus:ring-[#607466] dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber" // Changed from "phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone Number // Updated label
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber" // Changed from "phone"
                      name="phoneNumber" // Changed from "phone"
                      value={formData.phoneNumber} // Changed from "phone"
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dun dark:focus:border-[#607466] focus:ring-dun dark:focus:ring-[#607466] dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-dun dark:focus:border-[#607466] focus:ring-dun dark:focus:ring-[#607466] dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-dun dark:bg-[#607466] text-white rounded hover:bg-dun/90 dark:hover:bg-[#607466]/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              My Cart Summary
            </h2>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  You have {cartItems.length} items in your cart.
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="font-semibold text-lg text-gray-800 dark:text-white">
                    Total: ₦{getCartTotal().toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={openCartDrawer}
                  className="w-full px-4 py-2 bg-dun dark:bg-[#607466] text-white rounded hover:bg-dun/90 dark:hover:bg-[#607466]/90 transition-colors"
                >
                  View Cart
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Your cart is empty.
                </p>
                <button
                  onClick={() => (window.location.href = "/products")}
                  className="w-full px-4 py-2 bg-dun dark:bg-[#607466] text-white rounded hover:bg-dun/90 dark:hover:bg-[#607466]/90 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
