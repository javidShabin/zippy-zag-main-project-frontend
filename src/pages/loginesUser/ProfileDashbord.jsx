import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import ProfileSideBar from "../../components/loginedUser/ProfileSideBar";

const ProfileDashbord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Default profile route
  const defaultRoute = "/user/profile/profile-page";

  return (
    <div className="relative flex h-screen mt-9">
      {/* Redirect to default profile route */}
      {location.pathname === "/user/profile" && (
        <Navigate to={defaultRoute} replace />
      )}

      {/* Menu Button for Small Screens */}
      <button
        className="absolute top-4 left-4 z-20 p-2 bg-gray-200 rounded-md shadow-md md:hidden"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-100 shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/4`}
      >
        <ProfileSideBar />
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileDashbord;
