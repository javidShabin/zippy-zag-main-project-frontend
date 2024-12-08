import { Menu, MessagesSquare, ShoppingCart, UserPen, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to change header color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isScrolled ? "bg-[#ffffff70] shadow-md backdrop-blur-lg" : ""
      } text-white transition duration-300`}
    >
      <div className="container flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div className="logo">
          <h1>
            <img src={logo} className="w-[70px] lg:w-[80px] " />
          </h1>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full backdrop-blur-xl text-black md:static md:block md:w-auto md:bg-transparent md:backdrop-blur-none`}
          aria-label="Main Navigation"
        >
          <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Link to={"/"}>
              <li
                onClick={toggleMenu}
                className="block font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 relative overflow-hidden group"
              >
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li
                onClick={toggleMenu}
                className="block font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 relative overflow-hidden group"
              >
                About
              </li>
            </Link>
            <Link to={"/restaurant"}>
              <li
                onClick={toggleMenu}
                className="block font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 relative overflow-hidden group"
              >
                Restaurants
              </li>
            </Link>
            <li
              onClick={toggleMenu}
              className="block font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 relative overflow-hidden group"
            >
              Contact
            </li>
            {/* Chat and Join Us for Small Screens */}
            <li className="flex flex-col items-center space-y-4 md:hidden">
              <div className="relative">
                <Link to={"/user/chat-page"}>
                  <MessagesSquare className="w-6 h-6 text-orange-400 animate-bounce cursor-pointer transition duration-300" />
                </Link>
              </div>
              <Link to={"/user/profile"}>
                <div className="py-1 sm:py-2 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 mt-4 text-xs sm:text-base">
                  {" "}
                  <UserPen className="w-7 h-7 text-whit " />
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Join Us Button and Chat Icon (Large Screens) */}
        <div className="hidden md:flex gap-5 items-center space-x-4">
          <div className="relative">
            <Link to={"/user/chat-page"}>
              <MessagesSquare className="w-7 h-7 text-orange-400 animate-bounce cursor-pointer transition duration-300" />
            </Link>
          </div>
          <div>
            <Link to={"/user/cart-page"}>
              <ShoppingCart className="w-7 h-7 text-orange-400 cursor-pointer " />
            </Link>
          </div>
          <Link to={"/user/profile"}>
            <div className="bg-[#ffa100] py-2 px-4 shadow-sm shadow-[#ffa100] hover:shadow-lg hover:shadow-[#ffb300] rounded-full font-medium transition duration-200">
              {" "}
              <UserPen className="w-7 h-7 text-white " />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
