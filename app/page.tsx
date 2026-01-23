"use client"; // Hook use karne ke liye Client Component banana padega

import React, { useState } from "react"; // State import ki
import { StatsGrid } from "./components/dashboard/StatsGrid";
import { ChartsRowOne } from "./components/dashboard/ChartsRowOne";
import { ChartsRowTwo } from "./components/dashboard/ChartsRowTwo";
import { CustomerReviews } from "./components/dashboard/CustomerReviews";
import { MenuGenerator } from "./components/ai/MenuGenerator";
import { Sparkles } from "lucide-react"; // Button Icon

export default function Home() {
  const [isAiOpen, setIsAiOpen] = useState(false); // Modal control state

  // --- Date Logic ---
  const today = new Date();
  const pastDate = new Date(); 
  pastDate.setMonth(today.getMonth() - 5); 

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const dateRange = `${formatDate(pastDate)} - ${formatDate(today)}`;

  return (
    <div className="space-y-8 relative">
      
      {/* --- AI Modal (Hidden by default) --- */}
      <MenuGenerator isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

      {/* 1. Header Area */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
          <p className="text-sm text-text-secondary">Hi, Samantha. Welcome back to Sedap Admin!</p>
        </div>
        
        <div className="flex items-center gap-4">
            {/* ✨ NEW AI BUTTON ✨ */}
            <button 
                onClick={() => setIsAiOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-green-400 text-white px-5 py-3 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all active:scale-95"
            >
                <Sparkles size={18} fill="white" />
                <span>AI Menu Tool</span>
            </button>

            {/* Date Filter Box */}
            <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                </div>
                <div className="text-left">
                    <p className="text-xs text-text-secondary">Filter Periode</p>
                    <p className="text-xs font-bold text-text-primary">{dateRange}</p>
                </div>
                <span className="text-gray-400 text-xs">▼</span>
            </div>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <StatsGrid />

      {/* 3. Row One */}
      <ChartsRowOne />

      {/* 4. Row Two */}
      <ChartsRowTwo />

      {/* 5. Customer Review (AI Tool remove kar diya yahan se) */}
      <CustomerReviews />
      
    </div>
  );
}