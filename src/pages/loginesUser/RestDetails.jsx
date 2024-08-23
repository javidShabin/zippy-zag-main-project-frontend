import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstants } from "../../config/axiosInstents";

const RestDetails = () => {
  const { id } = useParams();
  const [restDetails, setRestDetails] = useState(null);

  const getRestaurantById = async () => {
    try {
      const response = await axiosInstants({
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0000009b] to-transparent opacity-100">
        <div>
          <h1>{restDetails.name}</h1>
        </div>
        <div>
          <img className="w-[500px]" src={restDetails.image} alt="" />
        </div>
        </div>
        
        
        
      </div>
    </main>
  );
};

export default RestDetails;
