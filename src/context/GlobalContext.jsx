import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add dark mode state using localStorage for persistence
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    // Apply or remove dark class to html element
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/verify`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          // Clear any stale data
          await logout();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
        setUser(null);
        await logout();
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);

        // Return success and user data
        const result = { success: true, user: data.user };

        // Special handling for Safari to prevent redirection loops
        if (
          data.user.role === "ADMIN" &&
          /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        ) {
          // Use a sync approach for Safari, wait briefly before redirecting
          setTimeout(() => {
            // Use window.location instead of react-router for consistent behavior
            window.location.href = "/admin";
          }, 300);
          return result;
        }

        return result;
      } else {
        return {
          success: false,
          message: data.message || "Invalid email or password",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
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
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, ...data.user }));
        return { success: true, user: data.user };
      } else {
        // If we get a 401, trigger a re-authentication
        if (response.status === 401) {
          await checkAuth();
        }
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

  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/users/request-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message,
      };
    } catch (error) {
      console.error("Password reset request error:", error);
      return {
        success: false,
        message: "An error occurred during password reset request",
      };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/api/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message,
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return {
        success: false,
        message: "An error occurred during password reset",
      };
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    updateUser,
    apiUrl: API_URL,
    darkMode,
    toggleDarkMode,
    requestPasswordReset,
    resetPassword,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
