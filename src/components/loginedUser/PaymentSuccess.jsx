import React, { useEffect } from "react";
import { paymentDoneImage } from "../../assets";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { decrement } from "../../redux/features/cartSlice";

const PaymentSuccess = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const clearTheCart = async () => {
      try {
        const response = await axiosInstance.delete("/cart/clear");
        console.log(response)
        dispatch(decrement(0))
      } catch (error) {
        console.log(error);
      }
    };
    clearTheCart();
  }, [])
  return (
    <main className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-gradient-to-r from-green-50 to-green-100 px-8 py-16">
      {/* Left Content - Timeline and Success Message */}
      <div className="lg:w-1/2 flex flex-col items-start">
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Thank you for your payment! Your transaction has been completed, and
          we’re excited to serve you. If you have any questions, feel free to
          contact our support team.
        </p>
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Your Payment Journey
          </h2>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="ml-6">
                <p className="text-lg text-gray-800 font-medium">
                  Payment Initiated
                </p>
                <p className="text-gray-600 text-sm">
                  We have started processing your payment.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="ml-6">
                <p className="text-lg text-gray-800 font-medium">
                  Processing Payment
                </p>
                <p className="text-gray-600 text-sm">
                  Your payment is being verified.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="ml-6">
                <p className="text-lg text-gray-800 font-medium">
                  Payment Completed
                </p>
                <p className="text-gray-600 text-sm">
                  Your payment was successfully completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src={paymentDoneImage}
          alt="Payment Successful"
          className="max-w-sm lg:max-w-lg rounded-xl"
        />
      </div>
    </main>
  );
};

export default PaymentSuccess;
