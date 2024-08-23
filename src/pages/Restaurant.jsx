import React, { useEffect, useState } from "react";
import { axiosInstants } from "../config/axiosInstents";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const [restData, setRestData] = useState([]);
  const navigate = useNavigate();

  const getRestaurants = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/restaurant/all-restaurants",
      });
      setRestData(response.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <main className="bg-gray-100 p-6 min-h-screen mt-16">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Our <span className="text-[#eb97f1]">Restaurants</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restData.length > 0 ? (
          restData.map((restaurant) => (
            <div
              onClick={() => {
                navigate(`/user/rest-details/${restaurant._id}`);
              }}
              className="relative w-full h-[250px] rounded-lg shadow-lg overflow-hidden bg-gray-200"
              style={{
                backgroundImage: `url(${restaurant.image})`,
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
          ))
        ) : (
          <div className="flex justify-center items-center "><span className="loading loading-dots loading-md bg-[#cd50f0]"></span></div>
        )}
      </div>
    </main>
  );
};

export default Restaurant;
