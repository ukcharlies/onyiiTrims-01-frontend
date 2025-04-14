const API_URL = import.meta.env.VITE_API_URL;

// Add error handling wrapper
const handleFetchError = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    try {
      const error = JSON.parse(text);
      throw new Error(error.message || "API request failed");
    } catch {
      throw new Error(text || "API request failed");
    }
  }
  return response.json();
};

// Update fetchWithCredentials to handle CORS in production
const fetchWithCredentials = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Trigger a page reload to force re-authentication
        window.location.href = "/login";
        throw new Error("Authentication expired, please login again");
      }
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/search?query=${encodeURIComponent(query)}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    return await response.json();
  } catch (error) {
    console.error("Search products error:", error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("Get all products error:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.error("Get product error:", error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${categoryId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    return await response.json();
  } catch (error) {
    console.error("Get products by category error:", error);
    throw error;
  }
};

// Get products by subcategory
export const getProductsBySubcategory = async (subcategoryId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/subcategory/${subcategoryId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by subcategory");
    }

    return await response.json();
  } catch (error) {
    console.error("Get products by subcategory error:", error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  return fetchWithCredentials("/api/categories");
};

// Get subcategories by category
export const getSubcategoriesByCategory = async (categoryId) => {
  return fetchWithCredentials(`/api/subcategories/category/${categoryId}`);
};

// Get subcategory by ID
export const getSubcategoryById = async (subcategoryId) => {
  return fetchWithCredentials(`/api/subcategories/${subcategoryId}`);
};

// Create product
export const createProduct = async (productData) => {
  try {
    console.log("Sending product data:", productData);

    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      credentials: "include",
      // Do not set Content-Type for FormData
      body: productData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error:", errorData);
      throw new Error(errorData.message || "Failed to create product");
    }

    return response.json();
  } catch (error) {
    console.error("Create product error:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId) => {
  return fetchWithCredentials(`/api/products/${productId}`, {
    method: "DELETE",
  });
};

// Update product
export const updateProduct = async (productId, productData) => {
  const response = await fetch(`${API_URL}/api/products/${productId}`, {
    method: "PUT",
    credentials: "include",
    body: productData, // FormData object for file upload
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update product");
  }

  return response.json();
};

// Get user's orders
export const getUserOrders = async () => {
  return fetchWithCredentials("/api/orders/my-orders");
};

// Get order details (now works for both users and admins)
export const getOrderDetails = async (orderId) => {
  try {
    const response = await fetchWithCredentials(`/api/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error("Get order details error:", error);
    throw error;
  }
};

// Admin: Get all orders
export const getAllOrders = async () => {
  return fetchWithCredentials("/api/orders/admin");
};

// Admin: Update order status
export const updateOrderStatus = async (orderId, status) => {
  const response = await fetchWithCredentials(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return response;
};

// Create new order
export const createOrder = async (orderData) => {
  const response = await fetchWithCredentials("/api/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
  return response;
};

// Confirm payment
export const confirmPayment = async (paymentData) => {
  try {
    const response = await fetchWithCredentials("/api/orders/confirm-payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
    return response;
  } catch (error) {
    console.error("Payment confirmation error:", error);
    throw error;
  }
};

// Admin: Get all users
export const getAllUsers = async () => {
  return fetchWithCredentials("/api/users");
};

// Admin: Delete user
export const deleteUser = async (userId) => {
  return fetchWithCredentials(`/api/users/${userId}`, {
    method: "DELETE",
  });
};

// Admin: Update user
export const updateUser = async (userId, userData) => {
  return fetchWithCredentials(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
};

// Hot buy products fetch
export const getHotBuyProducts = async () => {
  return fetchWithCredentials("/api/products/hot-buy");
};

// Featured products fetch
export const getFeaturedProducts = async () => {
  return fetchWithCredentials("/api/products/featured");
};
