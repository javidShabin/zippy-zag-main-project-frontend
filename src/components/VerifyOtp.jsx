import { useForm } from "react-hook-form";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { axiosInstance } from "../config/axiosInstance";

const VerifyOtp = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/otpVerify",
        data,
      });
      toast.success(response.data.message);
      dispatch(saveUser())
      
    } catch (error) {
      dispatch(clearUser())
      console.log(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>

      {/* Email Input */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* OTP Input */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.otp && (
          <span className="text-red-500 text-sm">{errors.otp.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
      >
        Verify
      </button>
    </form>
  );
};

export default VerifyOtp;
