// components/AiAssistant.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaRobot, FaPaperPlane } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../models/chatMsg";

interface AiAssistantProps {
  chatId?: string;
  channel?: string;
  onBack: () => void;
}

export default function AiAssistant({ chatId, channel, onBack }: AiAssistantProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: Date.now(), text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai", time:"now" }]);
  const socketRef = useRef<Socket | null>(null);


    // Initialize WebSocket connection
    // useEffect(() => {
    //   console.log("chatId", chatId)
    //   // Only connect if we have a chatId (specific conversation)
    //   if (chatId) {
    //     socketRef.current = io("http://localhost:5000", {
    //       // Force WebSocket transport only
    //       transports: ["websocket"],
    //       // Force protocol version 3 to match Flask-SocketIO
    //       forceNew: true,
    //       upgrade: false,
    //       // Add these additional options for better compatibility
    //       reconnectionAttempts: 5,
    //       reconnectionDelay: 1000,
    //     })
        
    //     socketRef.current.on("ai_response", (data: { ai_response: any; sender: string; time: string; chatId: string }) => {
    //       // Only add message if it's for this chat
    //       console.log("new msg received on clientside", data)
    //       setMessages(prev => [
    //         ...prev,
    //         {
    //           id: prev.length + 1,
    //           text: data.ai_response["action1"],
    //           sender: "them",
    //           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    //         }
    //       ]);
          
    //     });
  
    //     return () => {
    //       if (socketRef.current) {
    //         socketRef.current.disconnect();
    //       }
    //     };
    //   }
    // }, [chatId]);
  

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { id: Date.now(), text: message, sender: "ai", time:"now" }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          text: "I'm analyzing your request. Here's what I found...", 
          sender: "ai" ,
          time: "now"
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