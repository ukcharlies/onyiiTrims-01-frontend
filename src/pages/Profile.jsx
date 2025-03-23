import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, isAuthenticated, logout, updateUser } = useGlobal();
  const { cartItems, getCartTotal } = useCart();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isEditing, setIsEditing] = useState(false);

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
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = {
      firstName,
      lastName,
      phoneNumber,
    };

    const result = await updateUser(updateData);

    if (result.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email (Cannot be changed)
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                value={email}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Optional"
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-dun text-white py-2 px-4 rounded-md hover:bg-dun/90 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setFirstName(user.firstName || "");
                  setLastName(user.lastName || "");
                  setPhoneNumber(user.phoneNumber || "");
                  setIsEditing(false);
                }}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <span className="font-semibold">First Name:</span>{" "}
                {user?.firstName}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Last Name:</span>{" "}
                {user?.lastName}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Email:</span> {user?.email}
            </div>
            {user?.phoneNumber && (
              <div className="mb-4">
                <span className="font-semibold">Phone:</span> {user.phoneNumber}
              </div>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-dun text-white py-2 px-4 rounded-md hover:bg-dun/90 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="border-t pt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">My Cart Summary</h2>
        {cartItems.length > 0 ? (
          <div>
            <p className="mb-2">
              You have {cartItems.length} items in your cart.
            </p>
            <p className="font-semibold text-lg">
              Total: ${getCartTotal().toFixed(2)}
            </p>
            <button
              onClick={openCartDrawer}
              className="inline-block px-4 py-2 bg-dun text-white rounded hover:bg-dun/90 transition-colors"
            >
              View Cart
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
