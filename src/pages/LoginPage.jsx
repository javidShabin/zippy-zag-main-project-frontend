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
        className="absolute top-1 left-52 w-12 sm:w-28 "
        alt="Decorative mint"
      />
      <img
        src={tomatoImage}
        className="absolute bottom-1 right-52 w-12 sm:w-28 "
        alt="Decorative tomato"
      />
      <img
        src={chillyImage}
        className="absolute top-1 right-52 w-12 sm:w-28 "
        alt="Decorative chili"
      />

      {/* Main Card */}
      <div className="backdrop-blur-[10px] shadow-lg rounded-lg p-6 md:p-8 w-[80%] border-w">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back to Zippyzag!
        </h2>
        <div className="flex justify-between items-center py-8 px-6">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="mb-6 w-[450px] h-auto object-contain"
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
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
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
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
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
                className="w-[400px] p-2 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
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
                className="text-[#dd63ff] hover:underline"
              >
                Signup
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[400px] bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
