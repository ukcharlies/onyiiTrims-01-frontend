import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { toast } from "react-toastify";

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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await login(data.email, data.password);

      if (result.success) {
        if (result.user && result.user.firstName) {
          toast.success(`Welcome back, ${result.user.firstName}!`);
        } else {
          toast.success("Login successful!");
        }

        // Redirect based on intended destination or default to dashboard
        const navigateTo = location.state?.from?.pathname || "/dashboard";
        navigate(navigateTo);
      } else {
        // Trigger shake animation
        setShakeForm(true);

        // Show error toast in the center position
        toast.error(result.message || "Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });

        setServerError(
          result.message || "Login failed. Please check your credentials."
        );

        // Reset shake animation after 500ms
        setTimeout(() => {
          setShakeForm(false);
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);

      // Trigger shake animation
      setShakeForm(true);

      // Show error toast
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });

      setServerError("An unexpected error occurred. Please try again.");

      // Reset shake animation after 500ms
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
            <input
              id="password"
              type="password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
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
