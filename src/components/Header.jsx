import { Menu, MessagesSquare, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        isScrolled ? "bg-[#3d3d3db3] backdrop-blur-sm" : "bg-[#ffffff80]"
      } text-white transition duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <div className="logo">
          <h1
            className={`text-2xl font-bold tracking-wide cursor-pointer ${
              isScrolled ? "text-white" : "text-black"
            }`}
          >
            ZippyZag
          </h1>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-[#ffffff64] backdrop-blur-md text-black md:static md:block md:w-auto md:bg-transparent md:backdrop-blur-none`}
          aria-label="Main Navigation"
        >
          <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <Link to={"/"}>
              <li className="block py-1 px-3 rounded-full transition duration-300 hover:bg-orange-400 hover:text-white">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="block py-1 px-3 rounded-full transition duration-300 hover:bg-orange-400 hover:text-white">
                About
              </li>
            </Link>
            <li>
              <a
                href="#"
                className="block py-1 px-3 rounded-full transition duration-300 hover:bg-orange-400 hover:text-white"
              >
                Restaurants
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-1 px-3 rounded-full transition duration-300 hover:bg-orange-400 hover:text-white"
              >
                Contact
              </a>
            </li>
            {/* Chat and Join Us for Small Screens */}
            <li className="flex flex-col items-center space-y-4 md:hidden">
              <div className="relative">
                <MessagesSquare className="w-6 h-6 text-orange-400 animate-bounce cursor-pointer transition duration-300" />
                <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold py-0.5 px-1.5 rounded-full">
                  3
                </span>
              </div>
              <a
                href="#"
                className="bg-orange-400 text-black py-2 px-4 rounded-md font-medium transition duration-300 hover:bg-black hover:text-white"
              >
                Join Us
              </a>
            </li>
          </ul>
        </nav>

        {/* Join Us Button and Chat Icon (Large Screens) */}
        <div className="hidden md:flex gap-5 items-center space-x-4">
          <div className="relative">
            <MessagesSquare className="w-7 h-7 text-orange-400 animate-bounce cursor-pointer transition duration-300" />
            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold py-0.5 px-1.5 rounded-full">
              3
            </span>
          </div>
          <a
            href="#"
            className="bg-orange-400 text-black py-2 px-4 rounded-md font-medium transition duration-300 hover:bg-black hover:text-white"
          >
            Join Us
          </a>
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
