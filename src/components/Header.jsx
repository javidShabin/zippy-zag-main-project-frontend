import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Header = () => {
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
      <div className="container mx-auto flex items-center justify-between px-6 md:px-10">
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
            {/* <Link>
              <li
                onClick={toggleMenu}
                className="block font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 relative overflow-hidden group"
              >
                Contact
              </li>
            </Link> */}
          </ul>
        </nav>

        {/* Join Us Button and Chat Icon (Large Screens) */}
        <div className="hidden md:flex gap-5 items-center space-x-4">
          <Link to={"/signup-page"}>
            <div className="py-1 sm:py-2 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 mt-4 text-xs sm:text-base">
              Join Us
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

export default Header;
