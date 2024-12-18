import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import Menus from "../../components/loginedUser/Menus";

const RestDetails = () => {
  const { id } = useParams();
  const [restDetails, setRestDetails] = useState(null);

  const getRestaurantById = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/restaurant/rest-details/${id}`,
      });
      setRestDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRestaurantById();
  }, [id]);

  if (!restDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-md bg-[#cd50f0]"></span>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center w-full mt-11 px-4 py-8">
    {/* Cover Image with Gradient */}
    <div
      className="relative flex flex-col md:flex-row justify-between items-center px-6 md:px-10 w-full max-w-7xl h-[350px] md:h-[450px] rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${restDetails.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute flex flex-col md:flex-row justify-between items-center px-6 md:px-10 inset-0 bg-gradient-to-t from-black/70 to-black/40">
        {/* Left Section */}
        <div className="text-center md:text-left max-w-sm md:max-w-lg">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {restDetails.name}
          </h1>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-1">
            {restDetails.location}
          </h2>
          <p className="text-sm md:text-base text-gray-400 mb-2">
            {restDetails.cuisine}
          </p>
          <p
            className={`text-sm md:text-base font-medium ${
              restDetails.isOpen ? "text-green-500" : "text-red-500"
            }`}
          >
            {restDetails.isOpen ? "Open Now" : "Closed"}
          </p>
        </div>
        {/* Right Section */}
        <div className="hidden md:block">
          <img
            className="w-72 md:w-[500px] rounded-xl shadow-lg"
            src={restDetails.image}
            alt={`${restDetails.name}`}
          />
        </div>
      </div>
    </div>
    {/* Menus Section */}
    <div className="mt-8 w-full max-w-7xl">
      <Menus restaurantId={id} />
    </div>
  </main>
  );
};

export default RestDetails;
