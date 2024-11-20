import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>ZippyZag</h1>
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Restaurants</li>
            <li>Contact</li>
          </ul>
          <div>
            <span>Join us</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
