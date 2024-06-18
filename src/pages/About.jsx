import React from "react";
import { deliveredImage, orderImage } from "../assets";

const About = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
              About Us
            </h2>
            <p className="text-gray-600 text-lg text-center mb-8">
              Welcome to Zippy Zag, your go-to destination for quick, delicious,
              and hassle-free food ordering. We connect you with the best local
              restaurants, delivering your favorite meals at lightning speed!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Purpose
                </h3>
                <p className="text-gray-600">
                  At Zippy Zag, our mission is to make food ordering simple and
                  fast, ensuring every meal is delivered hot and fresh. Whether
                  you’re craving a burger, pizza, or a gourmet dish, we’ve got
                  you covered.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Why Choose Us?
                </h3>
                <p className="text-gray-600">
                  With a wide range of restaurants to choose from and
                  easy-to-use technology, Zippy Zag offers the fastest and most
                  reliable food delivery experience. Enjoy your meals with just
                  a few clicks!
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <img
                src={deliveredImage}
                alt="Delicious Food"
                className="rounded-lg shadow-md w-64 h-64 object-cover"
              />
              <img
                src={orderImage}
                alt="Restaurant"
                className="rounded-lg shadow-md w-64 h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
