import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id, name, price, images = [], description, slug } = product;

  // Format price with Naira symbol
  const formatPrice = (value) => {
    return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Use onAddToCart if provided, otherwise use the context
    if (onAddToCart) {
      onAddToCart();
    } else {
      addToCart(product);
    }
  };

  // Handle card click to navigate to product details
  const handleCardClick = () => {
    // Navigate to product details page using id only (not slug)
    navigate(`/products/${id}`);
  };

  // Local fallback image (base64 encoded small gray image)
  const fallbackImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-56 bg-gray-100">
        <img
          src={images && images.length > 0 ? images[0] : fallbackImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        {/* Quick add to cart button */}
        <div className="absolute bottom-2 right-2">
          <button
            onClick={handleAddToCart}
            className="p-2 bg-dun text-white rounded-full hover:bg-dun/90 transition-colors duration-200"
            title="Add to cart"
          >
            <HiOutlineShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 hover:text-dun transition-colors duration-200 mb-1 truncate">
          {name}
        </h3>

        <p
          className="text-gray-600 text-sm mb-3 line-clamp-2"
          title={description}
        >
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="mt-1">
            <p className="text-lg font-medium text-gray-900">
              ₦{price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
