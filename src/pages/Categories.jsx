import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiChevronRight, HiOutlineShoppingBag } from "react-icons/hi";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";

const Categories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { apiUrl, darkMode } = useGlobal();
  const { addToCart } = useCart();
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [loading, setLoading] = useState({
    categories: true,
    categoryDetails: false,
    subcategories: false,
    products: false,
  });
  const [error, setError] = useState({
    categories: null,
    categoryDetails: null,
    subcategories: null,
    products: null,
  });

  // Fetch all categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const endpoint = `${apiUrl}/api/categories`;
        console.log("Fetching categories from:", endpoint);
        // Always attempt to fetch from the backend first
        const response = await fetch(endpoint);

        if (!response.ok) {
          const text = await response.text();
          console.error("Response not OK:", text);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Categories data:", data);
        setCategories(data);

        // If we have categories and no categoryId is selected, navigate to the first one
        if (data.length > 0 && !categoryId) {
          console.log(
            "No category selected, navigating to first category:",
            data[0].id
          );
          // Use replace instead of navigate to avoid adding to history stack
          navigate(`/categories/${data[0].id}`, { replace: true });
        }

        setLoading((prev) => ({ ...prev, categories: false }));
        setInitialLoadDone(true);
      } catch (err) {
        console.error("Error fetching categories:", err);

        // Fallback to mock data only if there was an error
        const mockCategories = [
          { id: "1", name: "Fabrics" },
          { id: "2", name: "Trims" },
          { id: "3", name: "Accessories" },
        ];
        setCategories(mockCategories);

        if (!categoryId) {
          navigate(`/categories/${mockCategories[0].id}`, { replace: true });
        }

        setError((prev) => ({
          ...prev,
          categories: "Using sample data. Could not connect to database.",
        }));
        setLoading((prev) => ({ ...prev, categories: false }));
        toast.warning("Using sample data - couldn't connect to database");
        setInitialLoadDone(true);
      }
    };

    fetchCategories();
  }, [apiUrl, navigate, categoryId]);

  // Fetch current category details when categoryId changes
  useEffect(() => {
    if (!initialLoadDone) {
      return; // Wait for initial load before fetching category details
    }

    if (!categoryId) {
      console.log("No categoryId, skipping category details fetch");
      return;
    }

    const fetchCategoryDetails = async () => {
      setLoading((prev) => ({
        ...prev,
        categoryDetails: true,
      }));

      try {
        const endpoint = `${apiUrl}/api/categories/${categoryId}`;
        console.log("Fetching category details from:", endpoint);
        // Get current category details
        const categoryResponse = await fetch(endpoint);
        if (!categoryResponse.ok) {
          const text = await categoryResponse.text();
          console.error("Response not OK:", text);
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }
        const categoryData = await categoryResponse.json();
        console.log("Category data:", categoryData);
        setCurrentCategory(categoryData);
        setLoading((prev) => ({ ...prev, categoryDetails: false }));
      } catch (err) {
        console.error("Error fetching category details:", err);

        // Fallback to mock data only if there was an error
        const mockCategory = {
          id: categoryId,
          name: categories.find((c) => c.id === categoryId)?.name || "Category",
          description: "This is a sample category description.",
        };

        setCurrentCategory(mockCategory);
        setError((prev) => ({
          ...prev,
          categoryDetails: "Using sample data for category details",
        }));
        setLoading((prev) => ({ ...prev, categoryDetails: false }));
      }
    };

    fetchCategoryDetails();
  }, [categoryId, apiUrl, categories, initialLoadDone]);

  // Fetch subcategories when categoryId changes
  useEffect(() => {
    if (!initialLoadDone) {
      return; // Wait for initial load before fetching subcategories
    }

    if (!categoryId) {
      console.log("No categoryId, skipping subcategories fetch");
      return;
    }

    const fetchSubcategories = async () => {
      setLoading((prev) => ({
        ...prev,
        subcategories: true,
      }));

      try {
        // Get subcategories for this category using the correct endpoint
        const endpoint = `${apiUrl}/api/subcategories/category/${categoryId}`;
        console.log("Fetching subcategories from:", endpoint);
        const subResponse = await fetch(endpoint);
        if (!subResponse.ok) {
          const text = await subResponse.text();
          console.error("Response not OK:", text);
          throw new Error(`HTTP error! Status: ${subResponse.status}`);
        }
        const subData = await subResponse.json();
        console.log("Subcategories data:", subData);
        setSubcategories(subData);

        // Reset active subcategory when category changes
        setActiveSubcategory(null);

        setLoading((prev) => ({ ...prev, subcategories: false }));
      } catch (err) {
        console.error("Error fetching subcategories:", err);

        // Fallback to mock data only if there was an error
        const mockSubcategories = [
          {
            id: "sub1",
            name: "Subcategory 1",
            categoryId: categoryId,
          },
          {
            id: "sub2",
            name: "Subcategory 2",
            categoryId: categoryId,
          },
        ];

        setSubcategories(mockSubcategories);
        setError((prev) => ({
          ...prev,
          subcategories: "Using sample data for subcategories",
        }));
        setLoading((prev) => ({ ...prev, subcategories: false }));
      }
    };

    fetchSubcategories();
  }, [categoryId, apiUrl, initialLoadDone]);

  // Fetch products when category or active subcategory changes
  useEffect(() => {
    if (!initialLoadDone) {
      return; // Wait for initial load before fetching products
    }

    if (!categoryId) {
      console.log("No categoryId, skipping products fetch");
      return;
    }

    const fetchProducts = async () => {
      setLoading((prev) => ({
        ...prev,
        products: true,
      }));

      try {
        let endpointUrl;

        // If subcategory is selected, get products for that subcategory
        if (activeSubcategory) {
          endpointUrl = `${apiUrl}/api/products/subcategory/${activeSubcategory.id}`;
        } else {
          // Otherwise get all products for the category
          endpointUrl = `${apiUrl}/api/products/category/${categoryId}`;
        }

        console.log("Fetching products from:", endpointUrl);
        const productsResponse = await fetch(endpointUrl);

        if (!productsResponse.ok) {
          const text = await productsResponse.text();
          console.error("Response not OK:", text);
          throw new Error(`HTTP error! Status: ${productsResponse.status}`);
        }

        const productsData = await productsResponse.json();
        console.log("Products data:", productsData);
        setProducts(productsData);
        setLoading((prev) => ({ ...prev, products: false }));
      } catch (err) {
        console.error("Error fetching products:", err);

        // Fallback to mock data only if there was an error
        const mockProducts = [
          {
            id: "p1",
            name: "Sample Product 1",
            price: 19.99,
            description: "This is a sample product description.",
            images: [],
          },
          {
            id: "p2",
            name: "Sample Product 2",
            price: 29.99,
            description: "Another sample product description.",
            images: [],
          },
        ];

        setProducts(mockProducts);
        setError((prev) => ({
          ...prev,
          products: "Using sample data for products",
        }));
        setLoading((prev) => ({ ...prev, products: false }));
      }
    };

    fetchProducts();
  }, [categoryId, activeSubcategory, apiUrl, initialLoadDone]);

  // Handle category change
  const handleCategoryChange = (catId) => {
    navigate(`/categories/${catId}`);
    setActiveSubcategory(null); // Reset active subcategory when changing categories
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(
      subcategory === activeSubcategory ? null : subcategory
    );
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading.categories) {
    return (
      <div className="pt-36 md:pt-40 min-h-screen flex justify-center items-start">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-40">
      {/* Show error message if using sample data */}
      {error.categories && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
          <div className="flex">
            <div>
              <p className="font-medium text-orange-800">Note</p>
              <p className="text-sm text-orange-700">{error.categories}</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="overflow-x-auto py-4">
            <div className="flex space-x-6 min-w-max">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`whitespace-nowrap py-2 px-4 font-medium rounded-md transition-colors ${
                    category.id === categoryId
                      ? `${darkMode ? "bg-[#607466]" : "bg-dun"} text-white`
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {loading.categoryDetails ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : currentCategory ? (
          <>
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex text-sm">
                <Link to="/" className="text-gray-500 hover:text-dun">
                  Home
                </Link>
                <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
                <span className="text-dun font-medium">
                  {currentCategory.name}
                </span>
              </nav>
            </div>

            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-lora mb-3">
                {currentCategory.name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300">
                {currentCategory.description}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Subcategories */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold font-lora mb-4 dark:text-white">
                    Subcategories
                  </h2>

                  {loading.subcategories ? (
                    <div className="flex justify-center py-4">
                      <Spinner size="sm" />
                    </div>
                  ) : error.subcategories ? (
                    <div className="text-orange-500 dark:text-orange-300 text-sm mb-4">
                      {error.subcategories}
                    </div>
                  ) : subcategories.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No subcategories found
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {subcategories.map((sub) => (
                        <li key={sub.id}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                              activeSubcategory &&
                              activeSubcategory.id === sub.id
                                ? `${
                                    darkMode ? "bg-[#607466]" : "bg-dun"
                                  } text-white`
                                : `hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200`
                            }`}
                            onClick={() => handleSubcategoryClick(sub)}
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Main Content - Products */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-lora dark:text-white">
                      {activeSubcategory
                        ? `Products in ${activeSubcategory.name}`
                        : "All Products"}
                    </h2>

                    {activeSubcategory && (
                      <button
                        onClick={() => setActiveSubcategory(null)}
                        className="text-sm text-dun dark:text-[#607466] hover:underline"
                      >
                        View all products
                      </button>
                    )}
                  </div>

                  {loading.products ? (
                    <div className="flex justify-center py-8">
                      <Spinner />
                    </div>
                  ) : error.products ? (
                    <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-300 p-4 rounded-md mb-4">
                      <p>{error.products}</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                      <HiOutlineShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 dark:text-white">
                        No products found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {activeSubcategory
                          ? `We couldn't find any products in the ${activeSubcategory.name} subcategory.`
                          : `We couldn't find any products in the ${currentCategory.name} category.`}
                      </p>

                      {activeSubcategory && (
                        <button
                          onClick={() => setActiveSubcategory(null)}
                          className={`inline-block ${
                            darkMode ? "bg-[#607466]" : "bg-dun"
                          } hover:opacity-90 text-white px-6 py-2 rounded-md transition-colors`}
                        >
                          View All Products
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          darkMode={darkMode}
                          onAddToCart={() => handleAddToCart(product)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No category selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
