import React from "react";
import { useForm } from "react-hook-form";

const EditeAddress = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // Handle form submission for profile update
  const onSubmit = async (data) => {
    console.log(data)
  };

  return (
    <div className="flex justify-center items-center h-[87vh] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <label className="mb-1 font-medium text-gray-700">Name</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <label className="mb-1 font-medium text-gray-700">Email</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        {/* Phone and Street on the same line */}
        <div className="flex space-x-4">
          <div className="w-full sm:w-1/2">
            <label className="mb-1 font-medium text-gray-700">Phone</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="tel"
              placeholder="Phone"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-1 font-medium text-gray-700">Street</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Street"
              {...register("street", { required: "Street is required" })}
            />
            {errors.street && (
              <span className="text-red-500">{errors.street.message}</span>
            )}
          </div>
        </div>

        {/* County and Postal Code on the same line */}
        <div className="flex space-x-4">
          <div className="w-full sm:w-1/2">
            <label className="mb-1 font-medium text-gray-700">County</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="County"
              {...register("county", { required: "County is required" })}
            />
            {errors.county && (
              <span className="text-red-500">{errors.county.message}</span>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label className="mb-1 font-medium text-gray-700">Postal Code</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", { required: "Postal Code is required" })}
            />
            {errors.postalCode && (
              <span className="text-red-500">{errors.postalCode.message}</span>
            )}
          </div>
        </div>

        <label className="mb-1 font-medium text-gray-700">City</label>
        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="City"
          {...register("city", { required: "City is required" })}
        />
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}

        <input
          type="submit"
          value="Update Profile"
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 cursor-pointer w-full transition duration-300"
        />
      </form>
    </div>
  );
};

export default EditeAddress;
