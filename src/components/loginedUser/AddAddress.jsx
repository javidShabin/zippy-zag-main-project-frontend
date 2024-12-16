import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        await axiosInstance.post("/address/create-address", data)
        toast.success("Address created")
        navigate("/user/cart-page")
    } catch (error) {
        console.log(error)
        toast.error("Address creation failed")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Address
        </h2>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Your Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Your Email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        {/* Street Field */}
        <input
          type="text"
          placeholder="Street"
          {...register("street", { required: "Street is required" })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
        />
        {errors.street && (
          <span className="text-red-500 text-sm">{errors.street.message}</span>
        )}

        {/* City and Postal Code Fields in the Same Line */}
        <div className="flex space-x-4">
          {/* City Field */}
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}

          {/* Postal Code Field */}
          <input
            type="text"
            placeholder="Postal Code"
            {...register("postalCode", { required: "Postal Code is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
          />
          {errors.postalCode && (
            <span className="text-red-500 text-sm">
              {errors.postalCode.message}
            </span>
          )}
        </div>

        {/* Country Field */}
        <input
          type="text"
          placeholder="Country"
          {...register("country", { required: "Country is required" })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
        />
        {errors.country && (
          <span className="text-red-500 text-sm">{errors.country.message}</span>
        )}

        {/* Phone Number Field */}
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phone", { required: "Phone number is required" })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-orange-500 focus:outline-none"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
