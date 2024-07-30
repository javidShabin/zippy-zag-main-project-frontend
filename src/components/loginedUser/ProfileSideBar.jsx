import React from "react";
import { Link } from "react-router-dom";

const ProfileSideBar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Settings
      </h2>
      <ul className="space-y-4">
        <li>
          <Link
            to={"/user/profile/profile-page"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-200 hover:text-orange-700 transition"
          >
            Profile Address
          </Link>
        </li>
        <li>
          <Link
            to={"/user/profile/forgot-pass"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-200 hover:text-orange-700 transition"
          >
            Forgot Password
          </Link>
        </li>
        <li>
          <a
            href="#edit-profile"
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-200 hover:text-orange-700 transition"
          >
            Edit Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSideBar;
