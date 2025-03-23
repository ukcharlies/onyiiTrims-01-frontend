import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiChevronRight,
  HiOutlineShoppingCart,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineHeart,
} from "react-icons/hi";
import Spinner from "../components/Spinner";
import { useGlobal } from "../context/GlobalContext";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const { apiUrl } = useGlobal();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Format price with Naira symbol
  const formatPrice = (value) => {
    return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // First try getting all products to find by slug if the productId looks like a slug
        // This is a workaround since the API doesn't support slug-based fetch
        let productData;

        // Try direct ID fetch first
        const endpoint = `${apiUrl}/api/products/${productId}`;
        console.log("Fetching product details from:", endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          // If direct ID fetch fails, try getting all products and filtering by slug
          console.log("Direct product fetch failed, trying to find by slug...");

          const allProductsEndpoint = `${apiUrl}/api/products`;
          const allProductsResponse = await fetch(allProductsEndpoint);

          if (!allProductsResponse.ok) {
            const text = await allProductsResponse.text();
            console.error("Response not OK:", text);
            throw new Error(
              `HTTP error! Status: ${allProductsResponse.status}`
            );
          }

          const allProducts = await allProductsResponse.json();
          console.log(
            `Checking ${allProducts.length} products for matching slug: ${productId}`
          );

          // Try to find the product by slug
          const matchingProduct = allProducts.find(
            (p) => p.slug === productId || p.id === productId
          );

          if (!matchingProduct) {
            throw new Error("Product not found by slug or ID");
          }

          productData = matchingProduct;

          // If found by slug, update the URL to use the proper ID
          if (productData.id !== productId) {
            console.log(
              `Found product by slug. Updating URL to use ID: ${productData.id}`
            );
            navigate(`/products/${productData.id}`, { replace: true });
          }
        } else {
          productData = await response.json();
        }

        console.log("Product data:", productData);
        setProduct(productData);

        // Fetch category details if available
        if (productData.subcategory?.category?.id) {
          try {
            const categoryId = productData.subcategory.category.id;
            const categoryEndpoint = `${apiUrl}/api/categories/${categoryId}`;
            const categoryResponse = await fetch(categoryEndpoint);
            if (categoryResponse.ok) {
              const categoryData = await categoryResponse.json();
              setCategory(categoryData);
            }
          } catch (err) {
            console.error("Error fetching category:", err);
          }
        }

        // Set subcategory data if available
        if (productData.subcategory) {
          setSubcategory(productData.subcategory);
        }

        // Fetch related products
        try {
          let relatedEndpoint;
          if (productData.subcategoryId) {
            relatedEndpoint = `${apiUrl}/api/products/subcategory/${productData.subcategoryId}`;
          } else if (productData.subcategory?.category?.id) {
            relatedEndpoint = `${apiUrl}/api/products/category/${productData.subcategory.category.id}`;
          }

          if (relatedEndpoint) {
            const relatedResponse = await fetch(relatedEndpoint);
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              // Filter out the current product and limit to 4 items
              setRelatedProducts(
                relatedData.filter((p) => p.id !== productData.id).slice(0, 4)
              );
            }
          }
        } catch (err) {
          console.error("Error fetching related products:", err);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);

        // Fallback to mock data for development
        const mockProduct = {
          id: productId,
          name: "Sample Product",
          description:
            "This is a sample product description with detailed information about the product features and benefits.",
          price: 5999.99,
          images: [],
          categoryId: "sample-category",
          subcategoryId: "sample-subcategory",
          stock: 25,
          specifications: [
            { name: "Material", value: "Premium Quality" },
            { name: "Dimensions", value: "25cm x 15cm" },
            { name: "Weight", value: "150g" },
          ],
        };

        setProduct(mockProduct);
        setCategory({ id: "sample-category", name: "Sample Category" });
        setSubcategory({
          id: "sample-subcategory",
          name: "Sample Subcategory",
        });
        setRelatedProducts([]);

        setError("Could not fetch product details. Using sample data.");
        toast.warning("Using sample data - couldn't connect to database");
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, apiUrl, navigate]);

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`${quantity} ${product.name} added to cart`);
    }
  };

  // Local fallback image
  const fallbackImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  if (loading) {
    return (
      <div className="pt-36 md:pt-40 min-h-screen flex justify-center items-start">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-36 md:pt-40 min-h-screen container mx-auto px-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          <h2 className="text-lg font-bold">Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/" className="text-dun mt-2 inline-block hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-40">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {error && (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
            <p className="text-orange-700">{error}</p>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-500 hover:text-dun">
              Home
            </Link>
            <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />

            {category && (
              <>
                <Link
                  to={`/categories/${category.id}`}
                  className="text-gray-500 hover:text-dun"
                >
                  {category.name}
                </Link>
                <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
              </>
            )}

            {subcategory && (
              <>
                <Link
                  to={`/subcategories/${subcategory.id}`}
                  className="text-gray-500 hover:text-dun"
                >
                  {subcategory.name}
                </Link>
                <HiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
              </>
            )}

            <span className="text-dun font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[activeImage]
                    : fallbackImage
                }
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </div>

            {/* Image thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`bg-gray-100 rounded-md overflow-hidden h-20 ${
                      activeImage === index ? "ring-2 ring-dun" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold font-lora mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                ₦{product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 mb-4">{product.description}</p>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Specifications</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium w-24 text-gray-700">
                          {spec.name}:
                        </span>
                        <span className="text-gray-600">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Stock info */}
            {product.stock !== undefined && (
              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    product.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>
            )}

            {/* Add to cart */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <HiOutlineMinus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-2 w-12 text-center">{quantity}</span>
                  <button
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <HiOutlinePlus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  className={`flex-1 flex items-center justify-center bg-dun text-white py-3 px-6 rounded-md hover:bg-dun/90 transition-colors ${
                    product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <HiOutlineShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button className="p-3 border border-gray-300 rounded-md text-gray-500 hover:text-dun hover:border-dun transition-colors">
                  <HiOutlineHeart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-lora mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => {
                    navigate(`/products/${related.id}`);
                  }}
                >
                  <div className="h-48 bg-gray-100">
                    <img
                      src={
                        related.images && related.images.length > 0
                          ? related.images[0]
                          : fallbackImage
                      }
                      alt={related.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1 truncate">
                      {related.name}
                    </h3>
                    <span className="text-dun font-bold">
                      {formatPrice(related.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
