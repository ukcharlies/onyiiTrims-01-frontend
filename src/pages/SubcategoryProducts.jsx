import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiChevronRight,
  HiOutlineShoppingBag,
  HiArrowLeft,
} from "react-icons/hi";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";

const SubcategoryProducts = () => {
  const { subcategoryId } = useParams();
  const { apiUrl } = useGlobal();
  const { addToCart } = useCart();

  const [subcategory, setSubcategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({
    subcategory: true,
    products: true,
  });
  const [error, setError] = useState({
    subcategory: null,
    products: null,
  });

  // Fetch subcategory details and products
  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        // Get subcategory details
        const subcategoryEndpoint = `${apiUrl}/api/subcategories/${subcategoryId}`;
        console.log("Fetching subcategory details from:", subcategoryEndpoint);
        const subcategoryResponse = await fetch(subcategoryEndpoint);
        if (!subcategoryResponse.ok) {
          const text = await subcategoryResponse.text();
          console.error("Response not OK:", text);
          throw new Error(`HTTP error! Status: ${subcategoryResponse.status}`);
        }
        const subcategoryData = await subcategoryResponse.json();
        console.log("Subcategory data:", subcategoryData);
        setSubcategory(subcategoryData);
        setLoading((prev) => ({ ...prev, subcategory: false }));

        // Get parent category if available
        if (subcategoryData.categoryId) {
          try {
            const categoryEndpoint = `${apiUrl}/api/categories/${subcategoryData.categoryId}`;
            console.log("Fetching parent category from:", categoryEndpoint);
            const categoryResponse = await fetch(categoryEndpoint);
            if (!categoryResponse.ok) {
              const text = await categoryResponse.text();
              console.error("Response not OK:", text);
              throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
            }
            const categoryData = await categoryResponse.json();
            console.log("Parent category data:", categoryData);
            setParentCategory(categoryData);
          } catch (err) {
            console.error("Error fetching parent category:", err);
            // Don't show error toast for this since it's not critical
          }
        }

        // Get products in this subcategory using correct endpoint
        const productsEndpoint = `${apiUrl}/api/products/subcategory/${subcategoryId}`;
        console.log("Fetching products from:", productsEndpoint);
        const productsResponse = await fetch(productsEndpoint);
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
        console.error("Error fetching subcategory data:", err);

        // Fallback to mock data only if there was an error
        const mockSubcategory = {
          id: subcategoryId,
          name: "Sample Subcategory",
          description: "This is a sample subcategory description.",
          categoryId: "1",
        };

        const mockParentCategory = {
          id: "1",
          name: "Parent Category",
        };

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

        setSubcategory(mockSubcategory);
        setParentCategory(mockParentCategory);
        setProducts(mockProducts);

        toast.warning("Using sample data - couldn't connect to database");
        setError({
          subcategory: "Using sample data. Could not connect to database.",
          products: "Using sample data for products",
        });
        setLoading({
          subcategory: false,
          products: false,
        });
      }
    };

    fetchSubcategoryData();
  }, [subcategoryId, apiUrl]);

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading.subcategory) {
    return (
      <div className="pt-36 md:pt-40 min-h-screen flex justify-center items-start">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-40">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {subcategory ? (
          <>
            {error.subcategory && (
              <div className="bg-orange-50 text-orange-500 p-4 rounded-md mb-6">
                <p>{error.subcategory}</p>
              </div>
            )}

            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex text-sm">
                <Link to="/" className="text-gray-500 hover:text-dun">
                  Home
                </Link>
                <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
                {parentCategory && (
                  <>
                    <Link
                      to={`/categories/${parentCategory.id}`}
                      className="text-gray-500 hover:text-dun"
                    >
                      {parentCategory.name}
                    </Link>
                    <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
                  </>
                )}
                <span className="text-dun font-medium">{subcategory.name}</span>
              </nav>
            </div>

            {/* Back to category link */}
            {parentCategory && (
              <Link
                to={`/categories/${parentCategory.id}`}
                className="inline-flex items-center text-dun hover:underline mb-6"
              >
                <HiArrowLeft className="mr-2 h-4 w-4" />
                Back to {parentCategory.name}
              </Link>
            )}

            {/* Subcategory Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-lora mb-3">
                {subcategory.name}
              </h1>
              <p className="text-gray-700">{subcategory.description}</p>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold font-lora mb-6">Products</h2>

              {loading.products ? (
                <div className="flex justify-center py-12">
                  <Spinner />
                </div>
              ) : error.products ? (
                <div className="bg-orange-50 text-orange-500 p-4 rounded-md mb-4">
                  <p>{error.products}</p>
                </div>
              ) : products.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <HiOutlineShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any products in this subcategory.
                  </p>
                  {parentCategory && (
                    <Link
                      to={`/categories/${parentCategory.id}`}
                      className="inline-block bg-dun hover:bg-dun/90 text-white px-6 py-2 rounded-md transition-colors"
                    >
                      Back to {parentCategory.name}
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryProducts;
