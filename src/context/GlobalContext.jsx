import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

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

  // Only modify the login function, keep everything else as is
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log("Attempting login for:", email);

      // Detect Safari browser
      const isSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      );
      console.log("Browser detected as Safari:", isSafari);

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify({ email, password }),
      });

      // Log response information for debugging
      console.log("Login response status:", response.status);
      console.log("Login response headers:", [...response.headers.entries()]);

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok) {
        const userData = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role || "CUSTOMER",
        };

        // Store in state
        setUser(userData);
        setIsAuthenticated(true);

        // For Safari, always store token in localStorage for API calls
        if (isSafari) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userRole", userData.role);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", userData.firstName);
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("loginTimestamp", Date.now().toString());
        }

        // Special handling for admin
        if (userData.role === "ADMIN") {
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminSession", "true");
          localStorage.setItem("adminSessionStart", Date.now().toString());
        }

        return {
          success: true,
          user: userData,
        };
      } else {
        return {
          success: false,
          message: data.message || "Invalid email or password",
        };
      }
    } catch (error) {
      console.error("Login error:", error);

      // Provide more specific error message for Safari users
      const errorMessage = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent
      )
        ? "Login failed due to Safari compatibility issues. Please try using a different browser or check if third-party cookies are enabled."
        : "An error occurred during login. Please try again.";

      return {
        success: false,
        message: errorMessage,
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

  // Add this simple function
  const checkAuth = async () => {
    // Simple implementation that doesn't change existing behavior
    return !!user; // Convert user to boolean
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
        // If we get a 401, handle it but don't change behavior
        if (response.status === 401) {
          // Just log it, no behavior change
          console.log("Authentication issue detected");
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

  // Add a refresh timestamp to trigger updates across the app
  const [refreshTimestamp, setRefreshTimestamp] = useState(Date.now());

  // Function to trigger a refresh
  const triggerRefresh = useCallback(() => {
    setRefreshTimestamp(Date.now());
  }, []);

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
    refreshTimestamp,
    triggerRefresh,
    checkAuth,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
