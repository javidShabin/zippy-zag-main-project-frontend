import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { axiosInstants } from "../config/axiosInstents";
import toast from "react-hot-toast";
import VerifyOtp from "../components/VerifyOtp";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { Link } from "react-router-dom";

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
      const response = await axiosInstants({
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl shadow-[#dd63ff] rounded-xl w-full max-w-md">
        {/* Top Image */}
        <div
          className="h-40 bg-cover bg-center rounded-t-xl"
          style={{
            backgroundImage: `url('https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg')`,
          }}
        ></div>

        {/* Form Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Join Zippyzag Today!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#dd63ff]"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#dd63ff]"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#dd63ff]"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("conformPassword", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#dd63ff]"
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
                placeholder="Phone Number"
                {...register("phone", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#dd63ff]"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  Phone number is required
                </span>
              )}
            </div>

            {/* Login Redirect */}
            <p className="text-sm text-gray-500 mb-6 text-center">
              Already have an account?{" "}
              <Link to={"/login-page"}>
                <span className="text-[#dd63ff] hover:underline">Login</span>
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#dd63ff] text-white py-3 rounded-lg hover:bg-purple-600 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* OTP Verification Section */}
      {showOtpForm && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <VerifyOtp />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
