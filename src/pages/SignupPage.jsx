import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { axiosInstants } from "../config/axiosInstents";
import toast from "react-hot-toast";
import VerifyOtp from "../components/VerifyOtp";

const SignupPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/user/register",
        data,
      });
      toast.success(response.data.message);
      setShowOtpForm(true);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="relative">
        {/* Sign Up Form */}
        <form
          className={`max-w-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg ${
            showOtpForm ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("conformPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.conformPassword && (
              <span className="text-red-500 text-sm">
                Password confirmation is required
              </span>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phone", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                Phone number is required
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {/* OTP Verification Section */}
        {showOtpForm && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <VerifyOtp />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignupPage;
