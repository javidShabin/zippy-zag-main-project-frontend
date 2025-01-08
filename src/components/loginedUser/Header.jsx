import { Menu, MessagesSquare, ShoppingCart, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { useSelector } from "react-redux";

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileImage = useSelector((state) => state.profile.image);

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
            {/* Chat and Join Us for Small Screens */}
            <li className="flex flex-col items-center space-y-4 md:hidden">
              <div className="relative">
                <Link to={"/user/chat-page"}>
                  <MessagesSquare className="w-6 h-6 text-orange-400 animate-bounce cursor-pointer transition duration-300" />
                </Link>
              </div>
              <Link to={"/user/profile"}>
                <div className="w-[40px] h-[40px]">
                  <img
                    src={profileImage} // Add a fallback image here
                    className="rounded-full w-full h-full object-cover"
                    alt="Profile"
                  />
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
          <div className="relative">
            <Link to={"/user/cart-page"}>
              <ShoppingCart className="w-7 h-7 text-orange-400 cursor-pointer" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
          <Link to={"/user/profile"}>
            <div className="w-[40px] h-[40px]">
              <img
                src={profileImage} // Add a fallback image here
                className="rounded-full w-full h-full object-cover"
                alt="Profile"
              />
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
