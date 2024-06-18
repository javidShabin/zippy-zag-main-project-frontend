import React from "react";
import { food, order, place } from "../assets";

const Demo = () => {
  return (
    <main className="flex justify-center items-center w-full ">
      <div className="container w-[90%] md:w-[80%] lg:w-[70%]">
        <div className="text-center">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold mt-5 text-black">
            How It <span className="text-[#eb97f1]">Works</span>
          </h1>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="flex overflow-x-auto gap-5 mt-8 px-4 py-6">
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
    </main>
  );
};

export default Demo;
