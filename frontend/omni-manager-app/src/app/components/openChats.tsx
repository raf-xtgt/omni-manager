// components/OpenChats.tsx
"use client";

import { FaRobot, FaPlus } from "react-icons/fa";

interface OpenChatsProps {
  onSelectChannel: (channel: string) => void;
  onSelectChat: (chatId: string) => void;
  activeView: "chats" | "messages" | "assistant";
  setActiveView: (view: "chats" | "messages" | "assistant") => void;
  selectedChannel: string | null; 
  selectedChat: string | null;  // Add this line
}

export default function OpenChats({
  onSelectChannel,
  onSelectChat,
  activeView,
  setActiveView,
  selectedChannel,
  selectedChat
}: OpenChatsProps) {
  // Mock data - in a real app this would come from an API
  const channels = [
    { id: "telegram", name: "Telegram", unread: 3 },
    { id: "whatsapp", name: "WhatsApp", unread: 5 },
    { id: "instagram", name: "Instagram", unread: 0 },
  ];

  const chats = [
    { id: "1", name: "John Doe", lastMessage: "Hello there!", time: "10:30 AM", unread: 2, channel: "telegram" },
    { id: "2", name: "Acme Corp", lastMessage: "Your order is ready", time: "Yesterday", unread: 0, channel: "whatsapp" },
    { id: "3", name: "Sarah Smith", lastMessage: "Thanks for your help!", time: "Monday", unread: 0, channel: "instagram" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Channels Section */}
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-2 flex justify-between items-center">
          Channels
          <button className="text-gray-500 hover:text-gray-700">
            <FaPlus />
          </button>
        </h2>
        <ul>
          {channels.map(channel => (
            <li 
              key={channel.id}
              className={`p-2 rounded cursor-pointer flex justify-between items-center ${activeView === "chats" && selectedChannel === channel.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => {
                onSelectChannel(channel.id);
                setActiveView("chats");
              }}
            >
              <span>{channel.name}</span>
              {channel.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {channel.unread}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chats Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="font-semibold mb-2">Recent Chats</h2>
        <ul>
          {chats.map(chat => (
            <li 
              key={chat.id}
              className={`p-2 rounded cursor-pointer ${selectedChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{chat.name}</span>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Assistant Button */}
      <div className="p-4 border-t">
        <button 
          className="w-full flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setActiveView("assistant")}
        >
          <FaRobot className="mr-2" />
          AI Assistant
        </button>
      </div>
    </div>
  );
}