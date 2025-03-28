// components/AiAssistant.tsx
"use client";

import { useState } from "react";
import { FaArrowLeft, FaRobot, FaPaperPlane } from "react-icons/fa";

interface AiAssistantProps {
  onBack: () => void;
}

export default function AiAssistant({ onBack }: AiAssistantProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { id: Date.now(), text: message, sender: "me" }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: "I'm analyzing your request. Here's what I found...", 
          sender: "ai" 
        }]);
      }, 1000);
      
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-2 md:hidden">
          <FaArrowLeft />
        </button>
        <div className="flex items-center">
          <FaRobot className="text-blue-500 mr-2" />
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask the AI assistant..."
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