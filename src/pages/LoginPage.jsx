import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";
import {
  chillyImage,
  heroImage,
  loginImage,
  mintImage,
  tomatoImage,
} from "../assets";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/user/login",
        data,
      });
      dispatch(saveUser());
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      dispatch(clearUser());
      toast.error("Login failed. Please try again!");
      console.log(error);
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
        className="absolute top-4 left-8 w-8 sm:w-12 md:w-20 lg:w-28"
        alt="Decorative mint"
      />
      <img
        src={tomatoImage}
        className="absolute bottom-4 right-8 w-8 sm:w-12 md:w-20 lg:w-28"
        alt="Decorative tomato"
      />
      <img
        src={chillyImage}
        className="absolute top-4 right-8 w-8 sm:w-12 md:w-20 lg:w-28"
        alt="Decorative chili"
      />

      {/* Main Card */}
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-3xl p-6 md:p-8 w-[90%] max-w-4xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center mb-4 md:mb-6">
          Welcome Back to Zippyzag!
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 md:py-8 md:px-6 space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full md:w-1/2 max-w-[300px] sm:max-w-[400px] lg:max-w-[450px] h-auto object-contain"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6 w-full max-w-md"
          >
            {/* Name Field */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            {/* Password Field */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
            {/* Redirect to Signup */}
            <p className="text-sm text-gray-500 text-center">
              New user?{" "}
              <Link
                to="/signup-page"
                className="text-orange-500 hover:underline"
              >
                Signup
              </Link>
            </p>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
