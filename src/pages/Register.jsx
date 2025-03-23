import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, login } = useGlobal();
  const navigate = useNavigate();

  // For password validation
  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      // Register the user
      const registerResult = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber || "", // Optional field
      });

      if (registerResult.success) {
        // If registration is successful, try to log in
        const loginResult = await login(data.email, data.password);

        if (loginResult.success) {
          toast.success(`Welcome to Onyi Trims, ${data.firstName}!`);
          navigate("/");
        } else {
          // If login fails, still redirect to login
          toast.success(
            "Registration successful! Please login with your credentials."
          );
          navigate("/login", {
            state: {
              message:
                "Registration successful! Please login with your credentials.",
            },
          });
        }
      } else {
        // Trigger shake animation
        setShakeForm(true);

        // Show error toast with center position
        toast.error(
          registerResult.message || "Registration failed. Please try again.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );

        setServerError(
          registerResult.message || "Registration failed. Please try again."
        );

        // Reset shake animation after 500ms
        setTimeout(() => {
          setShakeForm(false);
        }, 500);
      }
    } catch (err) {
      // Trigger shake animation
      setShakeForm(true);

      // Show error toast with center position
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });

      setServerError("An unexpected error occurred. Please try again.");
      console.error(err);

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
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="firstName">
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              className={`w-full p-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent`}
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
            />
            {errors.firstName && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lastName">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              className={`w-full p-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent`}
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
            {errors.lastName && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email*
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
              Phone Number{" "}
              <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className={`w-full p-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent`}
              {...register("phoneNumber", {
                pattern: {
                  value: /^\d{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password*
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
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
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password*
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`w-full p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-dun focus:border-transparent pr-10`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <HiEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <HiEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-dun text-white py-2 px-4 rounded-md hover:bg-dun/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-dun hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
