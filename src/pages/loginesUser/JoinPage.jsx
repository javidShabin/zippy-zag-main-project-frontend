import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState()
  console.log(userEmail)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/request/create-request",
        data
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset();
  };

  useEffect(()=>{
    const userEmail = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile")
        setUserEmail(response.data.email)
      } catch (error) {
        console.log(error)
      }
    }
    userEmail()
  },[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl text-gray-800 text-center mb-6 font-semibold">
          Join as a Partner
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Expand your business with us! Fill in your details to start your
          journey.
        </p>
        <p className="text-center text-red-600 mb-8 text-[18px[ font-semibold">If approved your request then send the join link and restaurant id 
          in your registered email
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Group 1: Restaurant & Owner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-gray-700 text-sm font-medium"
              >
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                {...register("restaurantName", {
                  required: "Restaurant name is required",
                })}
                type="text"
                className={`mt-1 w-full p-2 border ${
                  errors.restaurantName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., Tasty Bites"
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="ownerName"
                className="block text-gray-700 text-sm font-medium"
              >
                Owner Name
              </label>
              <input
                id="ownerName"
                {...register("ownerName", {
                  required: "Owner name is required",
                })}
                type="text"
                className={`mt-1 w-full p-2 border ${
                  errors.ownerName ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., John Doe"
              />
              {errors.ownerName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.ownerName.message}
                </p>
              )}
            </div>
          </div>

          {/* Group 2: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  
                })}
                type="email"
                value={userEmail}
                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., example@mail.com"
              />
              
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                id="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                type="text"
                className={`mt-1 w-full p-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., 9876543210"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Group 3: Location & Cuisine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-medium"
              >
                Location
              </label>
              <input
                id="location"
                {...register("location", { required: "Location is required" })}
                type="text"
                className={`mt-1 w-full p-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., New York"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="cuisine"
                className="block text-gray-700 text-sm font-medium"
              >
                Cuisine Type
              </label>
              <input
                id="cuisine"
                {...register("cuisine", {
                  required: "Cuisine type is required",
                })}
                type="text"
                className={`mt-1 w-full p-2 border ${
                  errors.cuisine ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="e.g., Italian, Chinese"
              />
              {errors.cuisine && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cuisine.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition duration-200"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinUs;
