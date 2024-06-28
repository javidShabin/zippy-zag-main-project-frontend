import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Settings, X } from "lucide-react"; // Import Settings and Close (X) icons
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideProfile } from "../../redux/features/shortProfileSlice";
import { Link } from "react-router-dom";

const ShortProfile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const closeShortProfile = () => {
    dispatch(hideProfile());
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/user-profile");
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  return (
    <section className="w-[350px] py-6 px-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg relative">
      <div>
        {user ? (
          <div className="space-y-5">
            {/* Close Icon */}
            <button
              onClick={() => closeShortProfile()}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Settings Icon */}
            <Link to={"/user/profile-page"}>
              {" "}
              <button
                className="absolute top-3 right-10 text-gray-500 hover:text-gray-700"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            </Link>

            {/* Profile Image and Name */}
            <div className="flex items-center gap-4">
              <img
                src={user.image || "/default-profile.png"} // Fallback image
                alt="User Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <h2 className="text-gray-900 text-lg font-semibold">
                {user.name || "Guest User"}
              </h2>
            </div>

            {/* Contact Details */}
            <div className="text-gray-700 text-sm">
              <p>
                <strong>Email:</strong> {user.email || "Not available"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "Not available"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading profile...</p>
        )}
      </div>
    </section>
  );
};

export default ShortProfile;
