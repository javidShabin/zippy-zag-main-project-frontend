import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const getDetails = async () => {
        const response = await axiosInstance({
          method: "GET",
          url: "/payment/session-status",
        });
        console.log(response);
      };
    
      const navigate = useNavigate();
    
      useEffect(() => {
        getDetails();
      }, []);
    
      return (
        <main>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500 mx-auto mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m0 0L9 12l-3-3m-2 9l7 7 13-13"
                />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your payment. Your transaction was successful.
              </p>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Go to Home
              </button>
            </div>
          </div>
          <div>
            <Review/>
          </div>
        </main>
      );
}

export default PaymentSuccess
