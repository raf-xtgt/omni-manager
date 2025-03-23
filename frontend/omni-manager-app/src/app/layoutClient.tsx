"use client";

import { useState } from "react";
import { FaHome, FaComments, FaBars, FaAngleLeft } from "react-icons/fa";
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-16'} bg-gray-800 text-white transition-width duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="flex items-center p-2">
            <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded">
              {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
            </button>
            <h1 className="text-2xl font-bold ml-4">Omni-Manager</h1>
          </div>
        </div>
        <div>
          <nav className="mt-6">
            <ul>
              <li className="mb-2">
                <a href="/" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded">
                <FaHome className="mr-2" />
                {isSidebarOpen && "Dashboard"} 
                </a>
              </li>
              <li className="mb-2">          
                <a href="/chat" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded">
                  <FaComments className="mr-2" />
                  {isSidebarOpen && "Chat"} 
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}