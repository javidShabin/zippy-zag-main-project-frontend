import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { chatImage } from "../../assets";
import { useForm } from "react-hook-form";

const ChatPage = () => {
  const [userDetails, setUserDetails] = useState(null); // User ID state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [sendMessage, setSendMessage] = useState([]); // Store multiple messages

  // Fetch User ID
  const getUserId = async () => {
    try {
      const response = await axiosInstance.get("/user/user-profile");
      setUserDetails(response.data);
    } catch (error) {
      console.error(
        "Error fetching user ID:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/chat/send",
        data: {
          userId: userDetails._id,
          message: data.message, // Use data.message
          sender: "user",
        },
      });
      setSendMessage((prevMessages) => [
        ...prevMessages,
        response.data.data.message, // Add new message to the state
      ]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${chatImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[90%] h-[85vh] p-6 space-y-6 overflow-y-auto backdrop-blur-lg bg-opacity-60 bg-[#807f7f] rounded-3xl m-4 shadow-lg">
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white">
              Welcome {userDetails.name}
            </h1>
            {/* Render chat messages */}
            <div className="flex flex-col space-y-4">
              {sendMessage.length > 0 ? (
                sendMessage.map((message, index) => (
                  <p
                    key={index}
                    className="text-white p-2 bg-[#fe9437] rounded-full w-[300px]"
                  >
                    {message}
                  </p>
                ))
              ) : (
                <p className="text-white">Start chatting here...</p>
              )}
            </div>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-5 text-white"
      >
        <input
          {...register("message", { required: "Message is required" })}
          type="text"
          placeholder="Enter message..."
          className="py-2 px-5 w-[30rem] rounded-full backdrop-blur-lg bg-opacity-70 bg-[#ffb62e]"
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
        <button
          type="submit"
          className="py-2 px-4 backdrop-blur-lg bg-opacity-80 bg-[#f9af25] rounded-full"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default ChatPage;
