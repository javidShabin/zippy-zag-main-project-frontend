import { useForm } from "react-hook-form";
import { axiosInstants } from "../config/axiosInstents";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      await axiosInstants({
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl shadow-[#dd63ff] rounded-xl w-full max-w-md">
        {/* Top Image */}
        <div
          className="h-40 bg-cover bg-center rounded-t-xl"
          style={{
            backgroundImage: `url('https://source.unsplash.com/800x600/?restaurant-food')`,
          }}
        ></div>

        {/* Form Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back to Zippyzag!
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

            {/* Error Message */}
            {errors.exampleRequired && (
              <span className="text-red-500 mb-4">This field is required</span>
            )}

            <p className="text-sm text-gray-500 mb-6 text-center">
              New user?{" "}
              <Link to={"/signup-page"}>
                <span className="text-[#dd63ff] hover:underline">Signup</span>
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#dd63ff] text-white py-3 rounded-lg hover:bg-purple-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
