import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const ProfileSideBar = () => {
  const navigation = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/logout",
      });
      toast.success("Logout success");
      navigation("/login-page");
    } catch (error) {
      console.log(error);
      toast.error("filed");
    }
  };
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Settings
      </h2>
      <ul className="space-y-4">
        <li>
          <Link
            to={"/user/profile/profile-page"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-200 hover:text-white transition"
          >
            Your Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/user/profile/edite-profile"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-200 hover:text-white transition"
          >
            Edite Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/user/profile/edite-password"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-200 hover:text-white transition"
          >
            Edite Password
          </Link>
        </li>

        <li>
          <Link
            to={"/user/profile/address-page"}
            className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-orange-200 hover:text-white transition"
          >
            Address add orders
          </Link>
        </li>
        <li
          onClick={handleLogout}
          className="block px-4 py-2 rounded-lg text-gray-700 bg-orange-400 hover:text-white transition"
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default ProfileSideBar;
