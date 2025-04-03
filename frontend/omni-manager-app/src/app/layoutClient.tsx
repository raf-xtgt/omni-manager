"use client";

import { useState } from "react";
import { FaHome, FaComments, FaBars, FaAngleLeft, FaUsersCog } from "react-icons/fa";
import { useUser } from "./context/userContext";
import Link from "next/link";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAdmin = user?.labels?.includes("admin");

  return (
    <div className="flex h-screen">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-16'} bg-gray-800 text-white transition-width duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="flex items-center p-2">
            <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded">
              {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
            </button>
            {isSidebarOpen && <h1 className="text-2xl font-bold ml-4">Omni-Manager</h1>}
          </div>
        </div>
        <div>
          <nav className="mt-6">
            <ul>
              <li className="mb-2">
                <Link href="/" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded">
                  <FaHome className="mr-2" />
                  {isSidebarOpen && "Dashboard"} 
                </Link>
              </li>
              <li className="mb-2">          
                <Link href="/chat" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded">
                  <FaComments className="mr-2" />
                  {isSidebarOpen && "Chat"} 
                </Link>
              </li>
              {isAdmin && (
                <li className="mb-2">          
                  <Link href="/admin/users" className="flex items-center justify-center p-2 hover:bg-gray-700 rounded">
                    <FaUsersCog className="mr-2" />
                    {isSidebarOpen && "Manage Users"} 
                  </Link>
                </li>
              )}
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