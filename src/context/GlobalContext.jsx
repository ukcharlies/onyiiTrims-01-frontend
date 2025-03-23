import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication using cookies
    const checkAuth = async () => {
      try {
        // Since we're using HttpOnly cookies, we just need to call the verify endpoint
        // The cookie will be sent automatically with the request
        const response = await fetch(`${API_URL}/api/users/verify`, {
          method: "GET",
          credentials: "include", // Important for sending cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setIsAuthenticated(true);
        return {
          success: true,
          user: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Add credentials for consistency
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: "Registration successful",
        };
      } else {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "An error occurred during registration",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear the cookie on server side
      await fetch(`${API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Update state
      setUser(null);
      setIsAuthenticated(false);

      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ ...user, ...data.user });
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Failed to update profile",
        };
      }
    } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        message: "An error occurred while updating profile",
      };
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        updateUser,
        apiUrl: API_URL,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
