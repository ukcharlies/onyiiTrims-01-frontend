import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { HiShoppingCart } from "react-icons/hi";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Ensure price is a number and handle potential undefined/null values
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product badge */}
      {product.isHotBuy && (
        <div className="absolute top-2 left-2 z-10 bg-dun text-white text-xs font-semibold px-2 py-1 rounded-sm">
          Hot Buy
        </div>
      )}
      {product.isNewlyAdded && (
        <div className="absolute top-2 right-2 z-10 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-sm">
          New
        </div>
      )}

      {/* Image container with hover effect */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="h-56 w-full overflow-hidden">
          <img
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
            src={product.images?.[0] || "/placeholder-image.jpg"}
            alt={product.name}
          />
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-dun transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Category info */}
        <p className="text-sm text-gray-500 mb-3">
          {product.subcategory?.category?.name} / {product.subcategory?.name}
        </p>

        {/* Price and add to cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center text-white bg-dun hover:bg-dun/90 focus:ring-2 focus:ring-dun/50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 transition-colors"
            aria-label="Add to cart"
          >
            <HiShoppingCart className="w-4 h-4 mr-1" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
