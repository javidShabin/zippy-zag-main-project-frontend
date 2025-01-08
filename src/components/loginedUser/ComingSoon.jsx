import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-lg sm:text-xl mb-6">
          The Delivery Boy feature is under construction. Stay tuned!
        </p>
        <button
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition duration-300"
          onClick={() => alert("Thank you for your patience!")}
        >
          Notify Me
        </button>
      </div>
      <footer className="mt-10 text-sm text-white/70">
        © 2025 YourCompany. All rights reserved.
      </footer>
    </div>
  );
};

export default ComingSoon;
