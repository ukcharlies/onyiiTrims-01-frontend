import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ProductSlider = ({ products, title, description }) => {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const { darkMode } = useGlobal();

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h2 className="font-playfair text-3xl font-bold mb-4 dark:text-white">
          {title}
        </h2>
        <div className="w-24 h-1 bg-dun dark:bg-[#607466] mx-auto mb-4"></div>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-1)}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 ${
            showArrows ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Product Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-4"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none">
              <ProductCard product={product} darkMode={darkMode} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(1)}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 ${
            showArrows ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
