import { useForm } from "react-hook-form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import VerifyOtp from "../components/VerifyOtp";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import {
  chilly1Image,
  chillyImage,
  heroImage,
  loginImage,
  mint1Image,
  mintImage,
  tomato1Image,
  tomatoImage,
} from "../assets";

const SignupPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/register",
        data,
      });
      toast.success(response.data.message);
      dispatch(saveUser());
      setShowOtpForm(true);
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(clearUser());
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Images */}
      <img
        src={mintImage}
        className="absolute top-1 left-52 w-12 sm:w-28 "
        alt="Decorative mint"
      />
      <img
        src={tomatoImage}
        className="absolute bottom-1 right-52 w-12 sm:w-28 "
        alt="Decorative mint"
      />
      <img
        src={chillyImage}
        className="absolute top-1 right-52 w-12 sm:w-28 "
        alt="Decorative mint"
      />

      {/* Main Card */}
      <div className="backdrop-blur-[10px] shadow-lg rounded-lg p-6 md:p-8 w-[80%] border-w">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Join Zippyzag Today!
        </h2>
        <div className="flex justify-between items-center py-8 px-6">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="mb-6 w-[450px] h-auto object-contain "
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md w-full"
          >
            {/* Name Field */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-400 focus:outline-none"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-400 focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password Fields */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-400 focus:outline-none"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Conform Password"
                {...register("conformPassword", { required: true })}
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-400 focus:outline-none"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  Password confirmation is required
                </span>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-400 focus:outline-none"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  Phone number is required
                </span>
              )}
            </div>

            {/* Login Redirect */}
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link
                to="/login-page"
                className="text-orange-500 hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[400px] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* OTP Verification Section */}
      {showOtpForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <VerifyOtp email={data.email} />
          </div>
        </div>
      )}
    </section>
  );
};

export default SignupPage;
