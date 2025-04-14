import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check if there's a redirect path
  const from = location.state?.from?.pathname || "/";

  // Check for any messages in the location state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await login(data.email, data.password);

      if (result.success) {
        // User successfully authenticated
        toast.success(
          result.user?.firstName
            ? `Welcome back, ${result.user.firstName}!`
            : "Login successful!"
        );

        // Check if it's Safari browser (for admin users only)
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );
        const isAdmin = result.user?.role === "ADMIN";

        if (isAdmin) {
          // Set a longer session marker for admins
          localStorage.setItem("adminSessionStart", Date.now().toString());

          if (isSafari) {
            toast.info("Preparing admin dashboard...");

            // For Safari, use a slight delay to ensure cookies are properly set
            setTimeout(() => {
              navigate("/admin");
            }, 800);
            return;
          }
        }

        // For non-Safari or non-admin users, navigate immediately
        const redirectPath =
          location.state?.from?.pathname || (isAdmin ? "/admin" : "/dashboard");

        navigate(redirectPath);
      } else {
        // Handle failed login
        setShakeForm(true);
        toast.error(result.message || "Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });
        setServerError(
          result.message || "Login failed. Please check your credentials."
        );
        setTimeout(() => {
          setShakeForm(false);
        }, 500);
      }
    } catch (err) {
      // Existing error handling code
      console.error("Login error:", err);
      setShakeForm(true);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      setServerError("An unexpected error occurred. Please try again.");
      setTimeout(() => {
        setShakeForm(false);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${
          shakeForm ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent pr-10`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <HiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
            <Link
              to="/forgot-password"
              className="block mt-2 text-sm text-dun hover:underline text-right"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-dun text-white py-2 px-4 rounded-md hover:bg-dun/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-gray-600">
            New user?{" "}
            <Link to="/register" className="text-dun hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
