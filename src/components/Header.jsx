import React, { useState, useEffect } from "react";
import { Menu, X, MessagesSquare } from "lucide-react"; // Import Lucide icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
  const [isChatActive, setIsChatActive] = useState(false); // State to track if chat is active
  const [isScrolled, setIsScrolled] = useState(false); // State to track if user scrolled

  // Toggle chat active state
  const handleChatClick = () => {
    setIsChatActive(!isChatActive);
  };

  // Add or remove header styles on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full py-5 sticky top-0 left-0 z-50 transition-all ${
        isScrolled
          ? "bg-transparent shadow-lg backdrop-blur-md"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="container w-[95%] mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-2xl font-bold text-[#FC8A06]">ZippyZag</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6 text-gray-800">
            <li className="hover:text-[#FC8A06] cursor-pointer">Home</li>
            <li className="hover:text-[#FC8A06] cursor-pointer">About</li>
            <li className="hover:text-[#FC8A06] cursor-pointer">Restaurants</li>
            <li className="hover:text-[#FC8A06] cursor-pointer">Contact</li>
          </ul>
        </nav>

        {/* Right Section with Icon and Join Us Button */}
        <div className="hidden md:flex items-center gap-4">
          <MessagesSquare
            onClick={handleChatClick} // Handle click to toggle active state
            className={`w-6 h-6 cursor-pointer transition-all ${
              isChatActive
                ? "text-[#fc8a33]" // Highlight when active
                : "text-[#FC8A06]"
            } hover:text-[#FC8A06]`} // Hover effect
          />
          <span className="px-4 py-2 bg-[#FC8A06] text-white rounded-lg cursor-pointer hover:bg-[#fc8a33]">
            Join Us
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden backdrop-blur-md bg-[#ffffff66]">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-800">
            <li className="hover:text-orange-600 cursor-pointer">Home</li>
            <li className="hover:text-orange-600 cursor-pointer">About</li>
            <li className="hover:text-orange-600 cursor-pointer">Restaurants</li>
            <li className="hover:text-orange-600 cursor-pointer">Contact</li>
            <li>
              <MessagesSquare
                onClick={handleChatClick} // Toggle active state on click
                className={`w-6 h-6 cursor-pointer transition-all ${
                  isChatActive
                    ? "text-orange-700"
                    : "text-orange-600"
                } hover:text-orange-700`} // Active and hover effect
              />
            </li>
            <li>
              <span className="px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700">
                Join Us
              </span>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
