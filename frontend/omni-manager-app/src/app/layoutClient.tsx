"use client";

import { useState } from "react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-width duration-300 ease-in-out`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Omni-Manager</h1>
          <button onClick={toggleSidebar} className="mt-4 p-2 bg-gray-700 rounded">
            {isSidebarOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <a href="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a>
            </li>
            <li className="mb-2">
              <a href="/chat" className="block p-2 hover:bg-gray-700 rounded">Chat</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}