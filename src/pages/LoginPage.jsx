import { useForm } from "react-hook-form";
import { axiosInstants } from "../config/axiosInstents";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await axiosInstants({
        method: "POST",
        url: "/user/login",
        data,
      });
      dispatch(saveUser());
      
    } catch (error) {
      dispatch(clearUser());
      
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[87vh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login
        </h2>

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        {errors.exampleRequired && (
          <span className="text-red-500 mb-4">This field is required</span>
        )}

        <p className="text-gray-500">
          New user? <span className="text-orange-400">Signup</span>
        </p>

        <input
          className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 cursor-pointer w-[100px] transition duration-300 mt-2"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
