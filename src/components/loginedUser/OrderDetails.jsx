import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderAddress, setOrderAddress] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");


  const orderId = id;

  const timelineSteps = [
    { id: "Progress", label: "Processing" },
    { id: "Transit", label: "In Transit" },
    { id: "Out for delivery", label: "Out for Delivery" },
    { id: "Delivered", label: "Delivered" },
  ];

  useEffect(() => {
    const getTheOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/payment/orders/${orderId}`);
        setOrderAddress(response.data.order.address);
        setOrderedItems(response.data.order.products);
        setOrderStatus(response.data.order.orderStatus);
      } catch (error) {
        console.log(error);
      }
    };
    getTheOrderDetails();
  }, [orderId]);

  const getStepStatus = (step) => {
    const currentIndex = timelineSteps.findIndex(
      (s) => s.id === orderStatus
    );
    const stepIndex = timelineSteps.findIndex((s) => s.id === step);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "inactive";
  };

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

      {/* Timeline */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Order Timeline
        </h2>
        <div className="relative">
          <div className="absolute inset-0 flex justify-between w-full items-center h-1 bg-gray-200" />
          <ul className="flex justify-between relative z-10">
            {timelineSteps.map((step) => (
              <li
                key={step.id}
                className={`flex flex-col items-center text-center w-1/4 ${
                  getStepStatus(step.id) === "completed"
                    ? "text-green-600"
                    : getStepStatus(step.id) === "active"
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                    getStepStatus(step.id) === "completed"
                      ? "bg-green-500 text-white"
                      : getStepStatus(step.id) === "active"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {getStepStatus(step.id) === "completed" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{timelineSteps.indexOf(step) + 1}</span>
                  )}
                </div>
                <span>{step.label}</span>
              </li>
            ))}
          </ul>
        </div>
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
                className="flex items-center justify-between p-4 w-[280px] bg-gray-50 rounded-lg border border-gray-200"
              >
                <img
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.itemName || "Product Image"}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 ml-4">
                  <span className="block text-gray-700 font-medium">
                    {item.ItemName}
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
