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
    <main className="flex flex-col justify-center items-center w-[100%] mt-11 px-4 py-8">
      {/* Cover Image with Gradient */}
      <div
        className="relative flex justify-between items-center px-10 w-[95%] h-[450px] rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${restDetails.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute flex justify-between items-center px-11 inset-0 bg-gradient-to-t from-[#000000aa] to-[#0000008d] opacity-100">
          <div>
            <h1 className="text-[35px] font-bold text-white">
              {restDetails.name}
            </h1>
            <h2 className="text-lg font-bold">{restDetails.location}</h2>
            <p className="text-gray-600">{restDetails.cuisine}</p>
            <p
              className={`text-sm font-medium ${
                restDetails.isOpen ? "text-green-600" : "text-red-600"
              }`}
            >
              {restDetails.isOpen ? "Open Now" : "Closed"}
            </p>
          </div>
          <div>
            <img
              className="w-[500px] rounded-xl opacity-90"
              src={restDetails.image}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <Menus restaurantId={id}/>
      </div>
    </main>
  );
};

export default RestDetails;
