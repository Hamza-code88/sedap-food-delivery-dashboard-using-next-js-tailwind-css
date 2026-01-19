"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar"; 
import { Header } from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Ye wo state hai jo sidebar ko chhota/bada karegi
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar ko control pass kiya */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Right Content Area - Dynamic Padding Logic */}
      <main 
        className={`flex-1 w-full transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:pl-[100px]" : "md:pl-[280px]" // 280px se 100px par jump karega
        }`}
      >
        <Header />
        
        <div className="px-8 pb-10">
          {children}
        </div>
      </main>
      
    </div>
  );
}