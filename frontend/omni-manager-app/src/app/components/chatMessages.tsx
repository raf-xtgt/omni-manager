// components/ChatMessages.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { sendMessage } from "../services/chatService";
import { ChatMessage } from "../models/chatMsg";

interface ChatMessagesProps {
  chatId?: string;
  channel?: string;
  onBack: () => void;
}

export default function ChatMessages({ chatId, channel, onBack }: ChatMessagesProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  
  // Initialize WebSocket connection
  useEffect(() => {
    console.log("chatId", chatId)
    // Only connect if we have a chatId (specific conversation)
    if (chatId) {
      socketRef.current = io("http://localhost:5000", {
        // Force WebSocket transport only
        transports: ["websocket"],
        // Force protocol version 3 to match Flask-SocketIO
        forceNew: true,
        upgrade: false,
        // Add these additional options for better compatibility
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      })
      
      socketRef.current.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socketRef.current.on("connect_error", (err) => {
        console.error("Connection error:", err);
      });

      socketRef.current.on("new_message", (data: { text: string; sender: string; time: string; chatId: string }) => {
        // Only add message if it's for this chat
        console.log("new msg received on clientside", data)
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.text,
            sender: "them",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Optimistically update UI
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      try {
        // Send message to backend
        const result = await sendMessage(message);
        
        if (result.error) {
          // Handle error (you might want to show an error message to the user)
          console.error('Failed to send message:', result.error);
          // Optionally: remove the optimistic update or mark it as failed
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error
      }
    }
  };
  // Get chat data
  const chatData = chatId ? {
    name: chatId === "1" ? "John Doe" : chatId === "2" ? "Acme Corp" : "Sarah Smith",
    messages: messages.length ? messages : [
      // Default messages if no messages received yet
      { id: 1, text: "Hello! Start your conversation here.", sender: "them" as const, time: "Now" }
    ]
  } : {
    name: channel === "telegram" ? "Telegram" : channel === "whatsapp" ? "WhatsApp" : "Instagram",
    messages: []
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