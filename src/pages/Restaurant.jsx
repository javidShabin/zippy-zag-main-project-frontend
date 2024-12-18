import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { filterData } from "../components/filterData/FilterData";

const Restaurant = () => {
  const [restData, setRestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRestaurants = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurant/all-restaurants",
      });
      // Validate the response and ensure restaurants is an array
      const restaurants = Array.isArray(response.data.restaurants)
        ? response.data.restaurants
        : [];
      setRestData(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantByMenu = async ({ name }) => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/restaurant/rest-details/menuItem/${name}`,
      });
      setRestData(response.data.restaurants);
    } catch (error) {
      toast.error("The item not available")
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <main className="bg-white p-6 min-h-screen mt-16">
      <div>
        <h3 className="font-bold text-[22px] mb-10 text-[#2d2d2d]">
          What's on your mind
        </h3>
        <div className="flex justify-start sm:justify-center items-center gap-5 mb-8 overflow-x-auto">
          {filterData.map((item, index) => (
            <div
              key={index}
              className="text-center mb-2 py-5 px-7 shadow-xl rounded-lg min-w-[180px]"
            >
              <img
                onClick={() => {
                  getRestaurantByMenu({ name: item.name });
                }}
                src={item.image}
                alt={item.category}
                className="w-16 h-16 object-cover mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-600">
                {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Our <span className="text-orange-500">Restaurants</span>
      </h1>

      {restData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restData.map((restaurant) => (
            <div
              onClick={() => {
                navigate(`/user/rest-details/${restaurant._id}`);
              }}
              className="relative w-full h-[250px] rounded-lg shadow-lg overflow-hidden bg-gray-200"
              style={{
                backgroundImage: `url(${
                  restaurant.image || "/fallback-image.jpg"
                })`, // Fallback image
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              key={restaurant._id}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0000004f] bg-opacity-40"></div>

              {/* Content */}
              <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <p className="text-sm">{restaurant.location}</p>
                <p className="text-xs mt-2">{restaurant.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No restaurants found.</div>
      )}
    </main>
  );
};

export default Restaurant;
