import React from "react";
import { useCart } from "../context/CartContext";
import { HiX, HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[60%] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-6">
                  <HiOutlineShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-8">
                  Looks like you haven't added any items to your cart yet
                </p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="inline-flex items-center px-6 py-3 bg-dun hover:bg-dun/90 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.images?.[0] || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className="block w-full text-center bg-dun text-white py-2 rounded-lg hover:bg-dun/90"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
