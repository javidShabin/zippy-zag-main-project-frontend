import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import { filterData } from "../components/filterData/FilterData"; // Ensure this import is correct

const Restaurant = () => {
  const [restData, setRestData] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]); // Store the original restaurant data
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false); // Loading state for filtered data
  const [error, setError] = useState(""); // Error message state
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
      setRestData(restaurants);  // Set the restData
      setAllRestaurants(restaurants); // Store the original data for fallback
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantByMenu = async ({ name }) => {
    setFilterLoading(true); // Start loading when filtering
    setError(""); // Clear any previous error message
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/restaurant/rest-details/menuItem/${name}`,
      });

      if (response?.data?.restaurants?.length > 0) {
        setRestData(response.data.restaurants); // Set the filtered restaurants
      } else {
        setRestData(allRestaurants); // If no filter matches, reset to all restaurants
        setError("No restaurants found for this filter");
      }
    } catch (error) {
      toast.error("The item is not available");
      console.error("Error fetching filtered restaurants:", error);
      setError("Error occurred while fetching the filtered data");
    } finally {
      setFilterLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (loading || filterLoading) {
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
                onClick={() => getRestaurantByMenu({ name: item.name })}
                src={item.imageSrc}
                alt={item.category}
                className="w-16 h-16 object-cover mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-600">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Our <span className="text-orange-500">Restaurants</span>
      </h1>

      {error && (
        <div className="text-center text-red-500 mb-4">
          {error}
        </div>
      )}

      {restData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restData.map((restaurant) => {
            if (!restaurant) return null; // Skip any null or undefined restaurants

            return (
              <div
                onClick={() => {
                  if (restaurant._id) {
                    navigate(`/user/rest-details/${restaurant._id}`);
                  }
                }}
                className="relative w-full h-[250px] rounded-lg shadow-lg overflow-hidden bg-gray-200"
                style={{
                  backgroundImage: `url(${
                    restaurant?.image ? restaurant.image : "/fallback-image.jpg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                key={restaurant._id}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0000004f] bg-opacity-40"></div>

                {/* Content */}
                <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                  <h2 className="text-lg font-semibold">
                    {restaurant?.name || "Unknown Restaurant"}
                  </h2>
                  <p className="text-sm">
                    {restaurant?.location || "Location not available"}
                  </p>
                  <p className="text-xs mt-2">
                    {restaurant?.description || "No description available"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-600">No restaurants found.</div>
      )}
    </main>
  );
};

export default Restaurant;
