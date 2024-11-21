import React from "react";
import { bannerImage, heroImage } from "../assets";
import About from "./About";

const Home = () => {
  return (
    <>
      <main className="w-full h-[100vh] flex justify-center items-center" style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
        <div
          className="container flex flex-col md:flex-row justify-around items-center rounded-lg px-10 w-[95%] h-[70vh] shadow-lg"
          
        >
          {/* Text Section */}
          <div className="text-white px-6 py-4 sm:px-10 sm:py-6 bg-black bg-opacity-50 rounded-lg max-w-[90%] md:max-w-[40%]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Feast Your Senses
            </h1>
            <p className="text-lg sm:text-xl mt-2">
              <span className="text-yellow-400">Fast</span> and{" "}
              <span className="text-green-400">Fresh</span>
            </p>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-14">
            <img
              src={bannerImage}
              alt="Delicious Food Banner"
              className="w-[890px] h-full "
            />
          </div>

          {/* Additional Info Section */}
          <div className="bg-white bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-md mt-6 md:mt-0 max-w-[90%] md:max-w-[30%]">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Experience the taste!
            </h3>
            <p className="text-gray-600 mt-2">
              Discover a variety of dishes delivered right to your door. Savor
              the flavor, anytime, anywhere.
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Experience the taste!
            </h3>
            <p className="text-gray-600 mt-2">
              Discover a variety of dishes delivered right to your door. Savor
              the flavor, anytime, anywhere.
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Experience the taste!
            </h3>
            <p className="text-gray-600 mt-2">
              Discover a variety of dishes delivered right to your door. Savor
              the flavor, anytime, anywhere.
            </p>
          </div>
        </div>
      </main>
      <About/>
    </>
  );
};

export default Home;
