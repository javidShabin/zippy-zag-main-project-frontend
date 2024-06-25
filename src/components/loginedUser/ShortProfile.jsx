import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const ShortProfile = () => {
  const [isUser, setIsuser] = useState({});

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/user-profile",
      });
      setIsuser(response.data);
      console.log(response);
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Make sure to call the function
  }, []);

  return (
    <section>
      <div className="container">
        <div>
        <img src={isUser.image} alt="User Profile" className="w-[70px] rounded-full" />
        <h2>{isUser.name}</h2>
        </div>
      </div>
    </section>
  );
};

export default ShortProfile;
