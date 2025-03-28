// app/chat/page.tsx
"use client";

import { useState } from "react";
import OpenChats from "../components/openChats";
import ChatMessages from "../components/chatMessages";
import AiAssistant from "../components/aiAssistant";

export default function Chat() {
  const [activeView, setActiveView] = useState<"chats" | "messages" | "assistant">("chats");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      
      <div className="flex gap-4 h-[calc(100%-3rem)]">
        {/* Open Chats Sidebar - always visible */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow">
          <OpenChats 
            onSelectChannel={setSelectedChannel}
            onSelectChat={(chatId) => {
              setSelectedChat(chatId);
              setActiveView("messages");
            }}
            activeView={activeView}
            setActiveView={setActiveView}
            selectedChannel={selectedChannel}
            selectedChat={selectedChat}  // Add this line
          />
        </div>
        
        {/* Main Content Area */}
        <div className="hidden md:block md:w-3/4 bg-white rounded-lg shadow">
          {activeView === "chats" && selectedChannel && (
            <ChatMessages 
              channel={selectedChannel}
              onBack={() => setActiveView("chats")}
            />
          )}
          
          {activeView === "messages" && selectedChat && (
            <ChatMessages 
              chatId={selectedChat}
              onBack={() => setActiveView("chats")}
            />
          )}
          
          {activeView === "assistant" && (
            <AiAssistant 
              onBack={() => setActiveView("chats")}
            />
          )}
        </div>
      </div>
    </div>
  );
}