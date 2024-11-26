import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-screen p-5 bg-gray-100">
      {/* Chat Header */}
      <div className="bg-gray-800 text-white py-3 text-center text-xl">
        Chat
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-scroll bg-white rounded-lg shadow-lg">
        {/* Messages */}
        <div className="bg-purple-600 text-white p-3 rounded-xl max-w-[70%] self-start">
          Hello! How can I help you today?
        </div>
        <div className="bg-purple-600 text-white p-3 rounded-xl max-w-[70%] self-start">
          I need assistance with my order.
        </div>
      </div>

      {/* Message Input */}
      <input
        type="text"
        className="p-3 rounded-full border border-gray-300 mt-4 text-lg"
        placeholder="Type your message..."
      />
    </div>
  );
};

export default ChatPage;
