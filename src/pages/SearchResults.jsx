import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import { useGlobal } from "../context/GlobalContext";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useGlobal();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err) {
        setError("Failed to fetch search results");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-36 md:pt-40">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dun"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-36 md:pt-40">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please try searching again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-36 md:pt-40">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Found {products.length} products matching your search
        </p>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} title="" description="" />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No products found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse our full collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
