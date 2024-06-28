import React from "react";
import { bannerImage, heroImage } from "../assets";
import Demo from "./Demo";
import Restaurant from "./Restaurant";
import ShortProfile from "../components/loginedUser/ShortProfile";
import { useSelector } from "react-redux";

const Home = () => {
  const { isUserShow } = useSelector((state) => state.visible);
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
        <div className="absolute right-5 top-20 sm:fixed z-30">{isUserShow ? <ShortProfile /> : ""}</div>
        <div className="container flex flex-col md:flex-row justify-between items-center rounded-lg px-6 sm:px-10 w-11/12 h-[80vh] sm:h-[70vh]">
          {/* Text Section */}
          <div className="text-[#0e092e] text-center md:text-left px-6 py-4 sm:py-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[65px] font-black">
              Delight in Every Bite,
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-black mt-5">
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
