import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useGlobal } from "../context/GlobalContext";
import { HiArrowLeft, HiShieldCheck } from "react-icons/hi";
import FlutterPay from "../components/FlutterPay";
import { createOrder } from "../services/api";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, updateUser } = useGlobal();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "", // Add this line
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    paymentMethod: "card",
  });
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Update delivery method state with pickup option
  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  const STANDARD_MINIMUM = 20000;
  const REGULAR_FEE = 1000;
  const EXPRESS_FEE = 5000;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Modify the calculateTotal function
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
      0
    );

    const shippingFee =
      deliveryMethod === "express"
        ? EXPRESS_FEE
        : deliveryMethod === "regular"
        ? REGULAR_FEE
        : deliveryMethod === "pickup"
        ? 0
        : 0;
    return itemsTotal + shippingFee;
  };

  // Add helper function to calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure authentication is properly set
    if (user && !localStorage.getItem("authToken")) {
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
        console.log("Token synchronized from cookie before order creation");
      }
    }

    try {
      // Update user profile with new address and phone
      await updateUser({
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      // Create order data
      const orderData = {
        shippingDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        paymentDetails: {
          method: formData.paymentMethod,
          transactionId: null, // This will be updated after payment
        },
        deliveryMethod: deliveryMethod.toUpperCase(), // Add this
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log("Creating order with data:", orderData);
      const response = await createOrder(orderData);
      setOrder(response.order); // Store the entire order object
      setOrderNumber(response.order.orderNumber);

      // Don't clear cart yet - wait for payment confirmation
      setShippingAddress(formData.address);
    } catch (error) {
      setError("Failed to create order. Please try again.");
      console.error("Order creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Move debug logging into useEffect
  useEffect(() => {
    console.log("Order State:", {
      order,
      orderNumber,
      amount: calculateTotal(),
    });
  }, [order, orderNumber]); // Only log when order or orderNumber changes

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checking out.
          </p>
          <Link
            to="/categories"
            className="px-6 py-3 bg-dun text-white rounded-md hover:bg-dun/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36 md:pt-40">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-dun hover:text-dun/80 transition-colors"
        >
          <HiArrowLeft className="mr-2" /> Back to Shopping
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center py-3 border-b border-gray-200 last:border-0"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item?.imageUrl || "/images/product-placeholder.jpg"}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium">{item?.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item?.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₦{(item?.price * item?.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₦{calculateSubtotal().toFixed(2)}
                </span>
              </div>

              {/* Delivery Options */}
              <div className="py-2">
                <p className="text-gray-600 mb-2">Delivery Method</p>
                <div className="space-y-2">
                  {/* Pickup Option */}
                  <div
                    className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                    onClick={() => setDeliveryMethod("pickup")}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        checked={deliveryMethod === "pickup"}
                        onChange={() => {}}
                        className="w-4 h-4 text-dun border-gray-300 rounded-full focus:ring-dun cursor-pointer"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="font-medium">Pickup in Store</p>
                      <p className="text-sm text-gray-500">
                        Free - Collect from our store
                      </p>
                    </div>
                  </div>

                  {/* Standard Delivery */}
                  <div
                    className={`flex items-center p-3 border rounded-md ${
                      calculateSubtotal() < STANDARD_MINIMUM
                        ? "opacity-50"
                        : "hover:border-dun cursor-pointer"
                    }`}
                    onClick={() =>
                      calculateSubtotal() >= STANDARD_MINIMUM &&
                      setDeliveryMethod("standard")
                    }
                  >
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        checked={deliveryMethod === "standard"}
                        onChange={() => {}}
                        disabled={calculateSubtotal() < STANDARD_MINIMUM}
                        className="w-4 h-4 text-dun border-gray-300 rounded-full focus:ring-dun cursor-pointer"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="font-medium">
                        Standard Delivery (1-7 days)
                      </p>
                      <p className="text-sm text-gray-500">
                        {calculateSubtotal() < STANDARD_MINIMUM
                          ? `Minimum order of ₦${STANDARD_MINIMUM.toLocaleString()} required`
                          : "Free Delivery Available"}
                      </p>
                    </div>
                  </div>

                  {/* Regular Delivery */}
                  <div
                    className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                    onClick={() =>
                      setDeliveryMethod((prev) =>
                        prev === "regular" ? "standard" : "regular"
                      )
                    }
                  >
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        checked={deliveryMethod === "regular"}
                        onChange={() => {}}
                        className="w-4 h-4 text-dun border-gray-300 rounded-full focus:ring-dun cursor-pointer"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="font-medium">Regular Delivery (1-7 days)</p>
                      <p className="text-sm text-gray-500">₦1,000</p>
                    </div>
                  </div>

                  {/* Express Delivery */}
                  <div
                    className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                    onClick={() =>
                      setDeliveryMethod((prev) =>
                        prev === "express" ? "standard" : "express"
                      )
                    }
                  >
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        checked={deliveryMethod === "express"}
                        onChange={() => {}}
                        className="w-4 h-4 text-dun border-gray-300 rounded-full focus:ring-dun cursor-pointer"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="font-medium">
                        Express Delivery (24-48 hours)
                      </p>
                      <p className="text-sm text-gray-500">₦5,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ₦
                  {(deliveryMethod === "express"
                    ? EXPRESS_FEE
                    : deliveryMethod === "regular"
                    ? REGULAR_FEE
                    : 0
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total</span>
                <span>₦{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center">
              <HiShieldCheck className="text-green-500 w-6 h-6 mr-2" />
              <span className="text-sm text-gray-600">
                All transactions are secure and encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                />
              </div>

              {/* Add this phone number field after email field */}
              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dun"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 mt-8">
                Payment Method
              </h2>

              {/* Payment Method Section */}
              <div className="mb-6 space-y-3">
                <div
                  className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, paymentMethod: "card" }))
                  }
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => {}}
                      className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-dun checked:border-8 transition-all duration-200 cursor-pointer"
                    />
                  </div>
                  <label className="ml-2 cursor-pointer">
                    Credit/Debit Card
                  </label>
                </div>

                <div
                  className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: "paypal",
                    }))
                  }
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={() => {}}
                      className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-dun checked:border-8 transition-all duration-200 cursor-pointer"
                    />
                  </div>
                  <label className="ml-2 cursor-pointer">PayPal</label>
                </div>

                <div
                  className="flex items-center p-3 border rounded-md hover:border-dun cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      paymentMethod: "bankTransfer",
                    }))
                  }
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      id="bankTransfer"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={formData.paymentMethod === "bankTransfer"}
                      onChange={() => {}}
                      className="appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-dun checked:border-8 transition-all duration-200 cursor-pointer"
                    />
                  </div>
                  <label className="ml-2 cursor-pointer">Bank Transfer</label>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 text-white font-medium rounded-md transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-dun hover:bg-dun/90"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Section - Only show after order is created */}
      {order && (
        <div className="mt-8">
          <div className="border p-4 rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">
              Order Created Successfully!
            </h3>
            <p className="mb-4">Order Number: {orderNumber}</p>
            <FlutterPay
              amount={calculateTotal()}
              orderNumber={orderNumber}
              orderId={order.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
