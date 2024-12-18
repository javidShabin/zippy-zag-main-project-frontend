import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../redux/features/profileSlice";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reqStatus, setRqStatus] = useState(""); // Initialize with an empty string
  const [reqColor, setRqColor] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    if (reqStatus === "pending") {
      setRqColor("bg-orange-500");
    } else if (reqStatus === "approved") {
      setRqColor("bg-green-500");
    } else if (reqStatus === "rejected") {
      setRqColor("bg-red-500");
    } else {
      setRqColor("");
    }
  }, [reqStatus]); // Add reqStatus as a dependency

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/user/user-profile",
        });
        setUserProfile(response.data);
        dispatch(setProfileImage(response.data.image))
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch profile.");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  

  useEffect(() => {
    const getRequestStatus = async () => {
      try {
        const response = await axiosInstance.get("/request/getRequestByUserId");
        setRqStatus(response.data.requests[0]?.status || "N/A");
      } catch (error) {
        console.log(error);
      }
    };
    getRequestStatus();
  }, []);

  return (
    <main className="relative h-[100vh] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Profile
        </h1>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-center mb-8">
              {userProfile?.image ? (
                <img
                  src={userProfile.image}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-orange-500 object-cover shadow-xl transform transition duration-300 ease-in-out hover:scale-110"
                />
              ) : (
                <div className="h-28 w-28 rounded-full border-4 border-orange-500 flex items-center justify-center shadow-xl">
                  <span className="text-orange-500 font-semibold">No Image</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
              {userProfile?.name || "Loading..."}
            </h2>
            <p className="text-center text-gray-600 mb-4">
              {userProfile?.email || ""}
            </p>
            <div className="mt-4 border-t border-gray-300 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">Profile Details</h3>
              <div className="flex items-center gap-10">
                <p className="text-gray-700">
                  Phone: {userProfile?.phone || "N/A"}
                </p>
                {reqStatus && (
                  <p>
                    Your request is:{" "}
                    <span className={`py-1 px-2 rounded-lg font-semibold text-white ${reqColor}`}>
                      {reqStatus}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {error && (
              <p className="text-red-500 mt-4 text-center font-medium">
                {error}
              </p>
            )}
            <Link to={"/user/profile/edite-profile"}>
              {/* Edit Profile Button */}
              <button className="mt-6 w-full py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none transform transition duration-300 ease-in-out">
                Edit Profile
              </button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
