import React from "react";
import { bannerImage, chilly1Image, chillyImage, heroImage, mint1Image, mintImage, tomato1Image, tomatoImage } from "../assets";
import Demo from "./Demo";
import Restaurant from "./Restaurant";

const Home = () => {
  return (
    <>
      <main
        className="w-full h-screen flex flex-col justify-center items-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <img
          src={mintImage}
          className="w-[50px] sm:w-[80px] absolute top-10 sm:top-20 right-16 sm:right-56 animate-slideRight"
        />
        <img
          src={tomatoImage}
          className="w-[50px] sm:w-[80px] absolute bottom-5 right-20 sm:right-80 animate-slideRight"
        />
        <img
          src={mint1Image}
          className="w-[70px] sm:w-[120px] absolute bottom-5 left-20 sm:left-80 animate-slideRight"
        />
        <img
          src={tomato1Image}
          className="w-[90px] sm:w-[150px] absolute top-5 sm:top-10 left-14 sm:left-56 animate-slideRight"
        />
        <img
          src={chillyImage}
          className="w-[70px] sm:w-[110px] absolute bottom-20 sm:bottom-60 right-0 animate-slideRight"
        />
        <img
          src={chilly1Image}
          className="w-[90px] sm:w-[150px] absolute bottom-20 sm:bottom-60 left-0 animate-slideRight"
        />
        <div className="container flex flex-col md:flex-row justify-between items-center rounded-lg px-4 sm:px-8 lg:px-12 w-11/12 h-[80vh] sm:h-[70vh]">
          {/* Text Section */}
          <div className="text-center md:text-left px-4 py-4 sm:py-6">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black">
              Delight in Every Bite,
            </h1>
            <h2 className="text-[#ffa100] text-2xl sm:text-3xl md:text-5xl lg:text-[70px] font-black mt-4">
              Delivered Right
            </h2>
            <p className="text-[#646464] mt-3 text-xs sm:text-sm lg:text-lg">
              www.zippyzag.com
            </p>
            <button className="py-2 sm:py-3 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg shadow-[#ffa100] mt-4 text-xs sm:text-base">
              Scroll Down
            </button>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-0 flex justify-center">
            <img
              src={bannerImage}
              alt="Delicious Food Banner"
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[550px] lg:max-w-[600px] opacity-[90%]"
            />
          </div>
        </div>
      </main>
      {/* Demo section */}
      <Demo />
      {/* Restaurant section */}
      <Restaurant />
    </>
  );
};

export default Home;
