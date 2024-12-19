import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";
import OrdersPage from "./OrderPage";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/user/user-profile",
        });
        setUserId(response.data._id);
      } catch (error) {
        console.log(error);
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
      console.log("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const response = await axiosInstance.delete(
        `/address/remove-address/${addressId}`
      );
      console.log(response);
      // Remove the deleted address from the local state
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting address:", error);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getTheAddress();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg bg-orange-400"></span>
      </div>
    );
  }

  return (
    <main>
      <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mb-3 text-gray-800">
        Your Addresses
      </h1>
      {addresses.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="w-[600px] border border-gray-200 rounded-xl shadow-lg py-10 px-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {address.name}
              </h3>
              <div className="text-md text-gray-600 space-y-1">
                <div className="flex gap-10">
                  <p>
                    <span className="font-medium text-gray-900">Email:</span>{" "}
                    {address.email}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Phone:</span>{" "}
                    {address.phone}
                  </p>
                </div>
                <div className="flex gap-10">
                  <p>
                    <span className="font-medium text-gray-900">Street:</span>{" "}
                    {address.street}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">City:</span>{" "}
                    {address.city}
                  </p>
                </div>
                <div className="flex gap-10">
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
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/user/profile/edite-address`}>
                  <button
                    onClick={() => console.log("Edit button clicked")} // Placeholder for edit action
                    className="bg-yellow-500 text-white py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setAddressToDelete(address._id);
                    setShowModal(true);
                  }}
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

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this address?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteAddress(addressToDelete)}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <OrdersPage />
    </main>
  );
};

export default Address;
