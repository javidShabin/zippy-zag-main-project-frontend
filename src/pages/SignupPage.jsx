import { useForm } from "react-hook-form";
import React from "react";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="max-w-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

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

      <div className="mb-4">
        <input
          type="tel"
          placeholder="Enter Phone Number"
          {...register("phone", { required: true })}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">Phone number is required</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default SignupPage;
