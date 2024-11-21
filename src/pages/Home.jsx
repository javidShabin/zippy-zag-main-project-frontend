import React from "react";
import { bannerImage, heroImage } from "../assets";
import About from "./About";

const Home = () => {
  return (
    <>
      <main
        className="w-full h-[100vh] flex justify-center items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container flex flex-col md:flex-row justify-between items-center rounded-lg px-6 sm:px-10 w-11/12 h-[70vh]">
          {/* Text Section */}
          <div className="text-white text-center md:text-left px-6 py-4 sm:py-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Feast Your Senses
            </h1>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-0">
            <img
              src={bannerImage}
              alt="Delicious Food Banner"
              className="w-full max-w-[600px] opacity-[95%]"
            />
          </div>
        </div>
      </main>
      <About />
    </>
  );
};

export default Home;
