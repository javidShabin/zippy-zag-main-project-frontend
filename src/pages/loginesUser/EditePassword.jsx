import React from 'react'
import { useForm } from 'react-hook-form';

const EditePassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      // Handle form submission for profile update
      const onSubmit = async (data) => {
        
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
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
    
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

            <label className="mb-1 font-medium text-gray-700">New Password</label>
            <input
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="New Password"
              {...register("password", { required: "New Password is required" })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}

    
            <input
              type="submit"
              value="Update Profile"
              className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 cursor-pointer w-full transition duration-300"
            />
          </form>
        </div>
      );
}

export default EditePassword
