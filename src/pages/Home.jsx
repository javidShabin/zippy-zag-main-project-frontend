import React from "react";
import { bannerImage, chilly1Image, chillyImage, heroImage, mint1Image, mintImage, tomato1Image, tomatoImage, } from "../assets";
import Demo from "./Demo";
import Restaurant from "./Restaurant";

const Home = () => {
  return (
    <>
      <main
        className="w-full h-screen flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src={mintImage} className="w-[100px] absolute top-20 right-56 animate-pulse transition duration-700 "/>
        <img src={tomatoImage} className="w-[100px] absolute bottom-5 right-80 animate-pulse transition duration-700 "/>
        <img src={mint1Image} className="w-[150px] absolute bottom-5 left-80 animate-pulse transition duration-700 "/>
        <img src={tomato1Image} className="w-[250px] absolute top-10 left-56 animate-pulse transition duration-700 "/>
        <img src={chillyImage} className="w-[140px] absolute bottom-60 right-0 animate-pulse transition duration-700 "/>
        <img src={chilly1Image} className="w-[180px] absolute bottom-60 left-0 animate-pulse transition duration-700 "/>
        <div className="container flex flex-col md:flex-row justify-between items-center rounded-lg px-6 sm:px-10 w-11/12 h-[80vh] sm:h-[70vh]">
          {/* Text Section */}
          <div className="text-center md:text-left px-6 py-4 sm:py-6">
          <h1 className="text-[#ffff]  text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black">
              Delight in Every Bite,
            </h1>
            <h2 className="text-[#ffa100] text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-black mt-5">
              Delivered Right
            </h2>
            <p className="leading-tight text-[#717171] mt-3 text-sm sm:text-base lg:text-lg">
              www.zippyzag.com
            </p>
            <button className="py-3 px-6 border-none bg-[#ffa100] font-semibold rounded-full shadow-lg shadow-[#ffa100] mt-5 text-sm sm:text-base">
              Scroll Down
            </button>
          </div>

          {/* Image Section */}
          <div className="mt-6 md:mt-0 flex justify-center">
            <img
              src={bannerImage}
              alt="Delicious Food Banner"
              className="w-full max-w-[550px] md:max-w-[600px] opacity-[90%]"
            />
          </div>
        </div>
      </main>
      {/* Demo section */}
      <Demo />
      {/* The restaurant section */}
      <Restaurant />
    </>
  );
};

export default Home;
