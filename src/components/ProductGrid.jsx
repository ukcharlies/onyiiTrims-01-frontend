import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

const ProductGrid = ({ products, title, description }) => {
  const { darkMode } = useGlobal();

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h2 className="font-playfair text-3xl font-bold mb-4 dark:text-white">
          {title}
        </h2>
        <div className="w-32 h-1 bg-dun dark:bg-[#607466] mx-auto mb-4"></div>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
        {" "}
        {/* Increased gap spacing */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-center" // Added flex centering
          >
            <ProductCard product={product} darkMode={darkMode} />
          </div>
        ))}
      </div>

      {products.length > 8 && (
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="tracking-widest italic font-medium text-lg inline-block relative group dark:text-white"
          >
            View All Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dun dark:bg-[#607466] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
