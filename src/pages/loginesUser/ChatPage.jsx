import React, { useEffect, useState, useMemo, useRef } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { chatImage } from "../../assets";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";

const ChatPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [getMessages, setGetMessages] = useState([]);
  const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState(null);
  const intervalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/chat/send", {
        userId: userDetails?._id,
        message: data.message,
        sender: "user",
      });
      setGetMessages((prevMessages) => [
        ...prevMessages,
        { ...response.data, sender: "user" },
      ]);
      reset(); // Clear input after submission
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getUserId = async () => {
    try {
      const response = await axiosInstance.get("/user/user-profile");
      setUserDetails(response.data);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getAllMessages = async () => {
    if (!userDetails?._id) return;

    try {
      const response = await axiosInstance.get(
        `/chat/getchat/${userDetails._id}`
      );
      const newMessages = response.data;

      if (newMessages.length > 0) {
        const latestTimestamp = newMessages[0].createdAt;
        if (latestTimestamp !== lastFetchedTimestamp) {
          setGetMessages(newMessages);
          setLastFetchedTimestamp(latestTimestamp);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (!isLoading && userDetails?._id) {
      getAllMessages();

      intervalRef.current = setInterval(() => {
        getAllMessages();
      }, 1000); // Refresh messages every 1 second

      return () => {
        clearInterval(intervalRef.current); // Cleanup on unmount
      };
    }
  }, [userDetails, isLoading]);

  const renderedMessages = useMemo(
    () =>
      getMessages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] md:max-w-[75%] p-3 md:p-4 rounded-lg shadow chat-bubble ${
              message.sender === "user"
                ? "bg-[#ffb62e] text-black"
                : "bg-white text-black"
            }`}
          >
            <p className="text-xs md:text-sm">{message.message}</p>
            <p className="text-[10px] md:text-xs text-gray-500 text-right">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )),
    [getMessages]
  );

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${chatImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full md:w-11/12 h-5/6 p-6 bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-lg">
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white mb-4">
              Welcome {userDetails?.name}
            </h1>
            <div className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
              {renderedMessages}
            </div>
          </>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sticky bottom-0 flex items-center justify-between w-full gap-4 mt-4 bg-gray-900 p-4 rounded-lg shadow-lg"
        >
          <input
            {...register("message", { required: "Message is required" })}
            type="text"
            placeholder="Enter your message..."
            className="flex-1 px-4 py-2 bg-white rounded-full shadow focus:outline-none"
            aria-label="Message input"
          />
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message.message}</p>
          )}
          <button
            type="submit"
            className="px-6 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatPage;
