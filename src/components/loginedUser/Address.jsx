import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState()

  useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axiosInstance({
            method: "GET",
            url: "/user/user-profile",
          });
          setUserId(response.data._id)
          
        } catch (error) {
          console.log(error)
        }
      };
      fetchUserProfile();
    }, []);

  const getTheAddress = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/address/get-address`,
        params: { userId },
      });
      setAddresses(response.data);
    } catch (error) {
      console.log("file")
      console.error("Error fetching addresses:", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/address/delete/${addressId}`,
      });
      setAddresses((prev) =>
        prev.filter((address) => address._id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getTheAddress();
    }
  }, [userId]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Addresses
      </h1>
      {addresses.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="w-[380px] border border-gray-200 rounded-xl shadow-lg py-10 px-6 bg-gradient-to-r from-blue-50 to-white hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {address.name}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {address.email}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Phone:</span>{" "}
                  {address.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Street:</span>{" "}
                  {address.street}
                </p>
                <p>
                  <span className="font-medium text-gray-900">City:</span>{" "}
                  {address.city}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Country:</span>{" "}
                  {address.country}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Postal Code:
                  </span>{" "}
                  {address.postalCode}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => console.log("Edit button clicked")} // Placeholder for edit action
                  className="bg-yellow-500 text-white py-1 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAddress(address._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No addresses found. Add one to get started!
        </p>
      )}
    </div>
  );
};

export default Address;
