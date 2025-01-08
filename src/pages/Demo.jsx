import React from "react";
import { food, joinBanner1, joinBanner2, order, place } from "../assets";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <main>
      <div className="flex justify-center items-center w-full ">
        <div className="container w-[90%] md:w-[80%] lg:w-[70%]">
          <div className="text-center">
            <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold mt-5 text-black">
              How It <span className="text-orange-500">Works</span>
            </h1>
          </div>
          {/* Horizontal Scroll Section */}
          <div className="flex justify-center overflow-x-auto gap-14 mt-8 px-4 py-6">
            {/* Article 1 */}
            <article className="bg-[#ffffff] w-[250px] sm:w-[300px] flex flex-col justify-center items-center rounded-lg shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src={order} alt="Order" className="w-[150px] mb-4" />
              <h3 className="text-lg font-semibold text-[#8e44ad]">
                Select Restaurant
              </h3>
            </article>

            {/* Article 2 */}
            <article className="bg-[#ffffff] w-[250px] sm:w-[300px] flex flex-col justify-center items-center rounded-lg shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src={food} alt="Order" className="w-[150px] mb-4" />
              <h3 className="text-lg font-semibold text-[#8e44ad]">
                Browse Menus
              </h3>
            </article>

            {/* Article 3 */}
            <article className="bg-[#ffffff] w-[250px] sm:w-[300px] flex flex-col justify-center items-center rounded-lg shadow-lg p-5 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img src={place} alt="Order" className="w-[150px] mb-4" />
              <h3 className="text-lg font-semibold text-[#8e44ad]">
                Place Order
              </h3>
            </article>
          </div>
        </div>
      </div>
      {/* Join us banner section */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Join With Us</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Join us and be part of an exciting journey toward innovation and
          growth. Whether you're a business looking to expand your reach or an
          individual seeking to explore new opportunities, we offer a platform
          designed to empower and inspire. Let's work together to create
          meaningful connections and achieve greater success.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 px-4 py-8">
          {/* First banner */}
          <div
            className="relative w-full max-w-[500px] h-64 sm:h-72 rounded-lg shadow-lg overflow-hidden bg-gray-200 transform transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${joinBanner1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00000085] bg-opacity-40 flex items-end text-left px-6 py-4">
              <div>
                <p className="text-orange-500 text-lg font-medium">
                  Signup as a Rider
                </p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  Ride With Us
                </h3>
                <Link to={"/user/coming-soon"}>
                  <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Second banner */}
          <div
            className="relative w-full max-w-[500px] h-64 sm:h-72 rounded-lg shadow-lg overflow-hidden bg-gray-200 transform transition-transform duration-300 hover:scale-105"
            style={{
              backgroundImage: `url(${joinBanner2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00000085] bg-opacity-40 flex items-end text-left px-6 py-4">
              <div>
                <p className="text-orange-500 text-lg font-medium">
                  Signup as a Business
                </p>
                <h3 className="text-white text-2xl font-bold mt-2">
                  Partner With Us
                </h3>
                <Link to={"/user/join-page"}>
                  <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/50 transition duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Demo;
