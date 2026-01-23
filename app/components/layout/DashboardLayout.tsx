"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar"; 
import { Header } from "./Header";
// Lucide icons se Menu icon import karein
import { Menu } from "lucide-react"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Desktop collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);
  // NEW: Mobile open/close state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      
      {/* Sidebar ko Mobile State pass ki */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}        // NEW PROP
        setIsMobileOpen={setIsMobileOpen}  // NEW PROP
      />

      {/* Main Content */}
      <main 
        className={`flex-1 w-full transition-all duration-300 ease-in-out ${
          // Desktop pe padding adjust hogi, Mobile pe padding 0 hogi
          isCollapsed ? "md:pl-[100px]" : "md:pl-[280px]"
        }`}
      >
        {/* Mobile Header Toggle (Only visible on Mobile) */}
        <div className="md:hidden p-4 pb-0 flex items-center">
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-primary"
            >
                <Menu size={24} />
            </button>
        </div>

        <Header />
        
        <div className="px-4 md:px-8 pb-10">
          {children}
        </div>
      </main>
      
    </div>
  );
}