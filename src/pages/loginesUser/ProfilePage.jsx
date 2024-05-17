import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const ProfilePage = () => {
  // State for user profile management
  const [isUser, setIsuser] = useState({});

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/user-profile",
      });
      console.log(response.data);
      setIsuser(response.data);
    } catch (error) {
      toast.error("Failed to fetch user profile");
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-50 py-10">
      <div className="w-full max-w-[500px] bg-white shadow-xl rounded-xl p-8 flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src={isUser.image || "/default-profile.png"}
            alt="User profile"
            className="rounded-full w-[160px] h-[160px] object-cover border-2 border-gray-200"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-medium text-gray-800">{isUser.name}</h1>
          <span className="block text-gray-500 mt-1">{isUser.email}</span>
          <h4 className="text-gray-500 mt-1">{isUser.phone}</h4>
        </div>

        <div className="mt-6 w-full">
          <div className="grid grid-cols-2 gap-6 text-center text-gray-600">
            <div>
              <h5 className="text-lg font-semibold text-gray-800">Joined</h5>
              <p>{new Date(isUser.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-800">Location</h5>
              <p>{isUser.location || "Not specified"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <button className="w-full py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
