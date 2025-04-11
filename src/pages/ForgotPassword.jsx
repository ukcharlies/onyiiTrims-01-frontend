import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobal } from "../context/GlobalContext";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { requestPasswordReset } = useGlobal();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await requestPasswordReset(data.email);

      if (result.success) {
        toast.success("Password reset OTP has been sent to your email");
        navigate("/reset-password", { state: { email: data.email } });
      } else {
        toast.error(result.message || "Failed to send reset OTP");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you an OTP to reset your
          password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-dun text-white py-2 px-4 rounded-md hover:bg-dun/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
