import { useState, useEffect } from "react";
import { useGlobal } from "../context/GlobalContext";
import ProductGrid from "../components/ProductGrid";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Shop = () => {
  const { apiUrl } = useGlobal();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = `${apiUrl}/api/products`;
        if (selectedCategory) {
          endpoint = `${apiUrl}/api/products/category/${selectedCategory.id}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, apiUrl]);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#343E3D] pt-16">
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-20">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Categories
              </h2>
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 dark:bg-gray-700 rounded"
                    ></div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <button
                        onClick={() => {
                          toggleCategory(category.id);
                          setSelectedCategory(category);
                        }}
                        className={`w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedCategory?.id === category.id
                            ? "bg-dun text-white dark:bg-[#607466]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span>{category.name}</span>
                        {category.subcategories?.length > 0 &&
                          (expandedCategories[category.id] ? (
                            <FaChevronDown className="w-4 h-4" />
                          ) : (
                            <FaChevronRight className="w-4 h-4" />
                          ))}
                      </button>

                      {/* Subcategories */}
                      {expandedCategories[category.id] &&
                        category.subcategories && (
                          <div className="ml-4 mt-2 space-y-1">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                to={`/subcategories/${subcategory.id}`}
                                className={`block py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  selectedCategory?.id === subcategory.id
                                    ? "bg-dun text-white dark:bg-[#607466]"
                                    : "text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {selectedCategory
                  ? `${selectedCategory.name} Products`
                  : "All Products"}
              </h2>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : products.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No products found in this category.
                </p>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
