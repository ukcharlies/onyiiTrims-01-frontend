import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  getCategories,
  getSubcategoriesByCategory,
  getSubcategoryById,
} from "../services/api";
import { useGlobal } from "../context/GlobalContext";

const ProductEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useGlobal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    subcategoryId: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== "ADMIN") {
      navigate("/dashboard");
      return;
    }

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productData, categoriesData] = await Promise.all([
          getProductById(productId),
          getCategories(),
        ]);

        // Get subcategory details to find parent category
        const subcategoryData = await getSubcategoryById(
          productData.subcategoryId
        );
        const categoryId = subcategoryData.categoryId;

        // Fetch subcategories for this category
        const subcategoriesData = await getSubcategoriesByCategory(categoryId);

        setSelectedCategory(categoryId);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setProduct({
          ...productData,
          price: String(productData.price),
          stock: String(productData.stock),
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, user, navigate]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        try {
          const data = await getSubcategoriesByCategory(selectedCategory);
          setSubcategories(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("subcategoryId", product.subcategoryId);

      // Add new images if any were selected
      if (product.newImages) {
        Array.from(product.newImages).forEach((image) => {
          formData.append("images", image);
        });
      }

      await updateProduct(productId, formData);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36">Loading...</div>
    );
  if (error)
    return (
      <div className="container mx-auto max-w-6xl p-4 pt-36 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-36">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label className="block mb-2">Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2">Stock</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Selection */}
            <div>
              <label className="block mb-2">Subcategory</label>
              <select
                value={product.subcategoryId}
                onChange={(e) =>
                  setProduct({ ...product, subcategoryId: e.target.value })
                }
                className="w-full border rounded p-2"
                required
                disabled={!selectedCategory}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* New Images */}
            <div>
              <label className="block mb-2">Add New Images</label>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setProduct({ ...product, newImages: e.target.files })
                }
                className="w-full border rounded p-2"
                accept="image/*"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="w-full border rounded p-2"
              rows="3"
              required
            />
          </div>

          {/* Current Images Preview */}
          {product.images && product.images.length > 0 && (
            <div>
              <label className="block mb-2">Current Images</label>
              <div className="flex gap-4 flex-wrap">
                {product.images.map((image, index) => (
                  <div key={index} className="w-24 h-24">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-dun text-white px-4 py-2 rounded hover:bg-dun/90"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEdit;
