import React from "react";
import { bannerImage, heroImage, mintLeav } from "../assets";
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
        <img src={mintLeav} className="w-[70px] absolute bottom-7 left-72 animate-bounce transition duration-300 " />
        <img src={mintLeav} className="w-[70px] absolute bottom-7 right-72 animate-bounce transition duration-300 " />
        <img src={mintLeav} className="w-[70px] absolute top-42 right-0 animate-bounce transition duration-300 " />
        <img src={mintLeav} className="w-[70px] absolute top-8 right-36 animate-bounce transition duration-300 " />
        <img src={mintLeav} className="w-[100px] absolute top-7 left-72 animate-bounce transition duration-300 " />
        <img src={mintLeav} className="w-[100px] absolute top-64 left-0 animate-bounce transition duration-300 " />
        <div className="container flex flex-col md:flex-row justify-between items-center rounded-lg px-6 sm:px-10 w-11/12 h-[80vh] sm:h-[70vh]">
          {/* Text Section */}
          <div className="text-center md:text-left px-6 py-4 sm:py-6">
          <h1 className="text-[#ffff]  text-3xl sm:text-4xl md:text-5xl lg:text-[75px] font-black">
              Delight in Every Bite,
            </h1>
            <h2 className="text-[#ffa100] text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-black mt-5">
              Delivered Right
            </h2>
            <p className="leading-tight mt-3 text-sm sm:text-base lg:text-lg">
              www.zippyzag.com
            </p>
            <button className="py-3 px-6 border-none rounded-full shadow-lg shadow-[#dd63ff] mt-5 text-sm sm:text-base">
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
