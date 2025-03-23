import React from "react";
import { useCart } from "../context/CartContext";
import { useGlobal } from "../context/GlobalContext";

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const { user } = useGlobal();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-xl mb-6">Your cart is empty</p>
        <a
          href="/shop"
          className="inline-block bg-dun text-white py-2 px-6 rounded-lg hover:bg-dun/90"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  <img
                    src={item.images?.[0] || "/placeholder-image.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total: ${getCartTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={user?.name || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="expiry">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="123"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-dun text-white py-3 rounded-lg hover:bg-dun/90 mt-6"
              >
                Pay ${getCartTotal().toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
