// components/ChatMessages.tsx
"use client";

import { useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaEllipsisV } from "react-icons/fa";

interface ChatMessagesProps {
  chatId?: string;
  channel?: string;
  onBack: () => void;
}

export default function ChatMessages({ chatId, channel, onBack }: ChatMessagesProps) {
  const [message, setMessage] = useState("");
  
  // Mock data
  const chatData = chatId ? {
    name: chatId === "1" ? "John Doe" : chatId === "2" ? "Acme Corp" : "Sarah Smith",
    messages: [
      { id: 1, text: "Hello there!", sender: "them", time: "10:30 AM" },
      { id: 2, text: "Hi! How can I help you today?", sender: "me", time: "10:31 AM" },
      { id: 3, text: "I have a question about my order", sender: "them", time: "10:32 AM" },
    ]
  } : {
    name: channel === "telegram" ? "Telegram" : channel === "whatsapp" ? "WhatsApp" : "Instagram",
    messages: []
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send to an API
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-2 md:hidden">
          <FaArrowLeft />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold">{chatData.name}</h2>
          {chatId && <p className="text-xs text-gray-500">Online</p>}
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <FaEllipsisV />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {channel && !chatId ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to view messages
          </div>
        ) : (
          <div className="space-y-4">
            {chatData.messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}