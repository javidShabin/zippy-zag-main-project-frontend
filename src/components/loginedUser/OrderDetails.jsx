import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderAddress, setOrderAddress] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);

  const orderId = id;

  useEffect(() => {
    const getTheOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/payment/orders/${orderId}`);
        setOrderAddress(response.data.order.address);
        setOrderedItems(response.data.order.products);
      } catch (error) {
        console.log(error);
      }
    };
    getTheOrderDetails();
  }, []);

  return (
    <div className="container mt-6 mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h1>

      {/* Shipping Address */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Shipping Address
        </h2>
        {Object.keys(orderAddress).length > 0 ? (
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Name:</strong> {orderAddress.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {orderAddress.email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {orderAddress.phone}
            </p>
            <p className="text-gray-600">
              <strong>Street:</strong> {orderAddress.street}
            </p>
            <p className="text-gray-600">
              <strong>City:</strong> {orderAddress.city}
            </p>
            <p className="text-gray-600">
              <strong>Postal Code:</strong> {orderAddress.postalCode}
            </p>
            <p className="text-gray-600">
              <strong>Country:</strong> {orderAddress.country}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Loading address...</p>
        )}
      </div>

      {/* Ordered Items */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ordered Items
        </h2>
        {orderedItems.length > 0 ? (
          <ul className="space-y-4">
            {orderedItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <img
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.itemName || "Product Image"}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 ml-4">
                  <span className="block text-gray-700 font-medium">
                    {item.itemName}
                  </span>
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No items found...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
