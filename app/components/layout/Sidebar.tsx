"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { NAV_ITEMS } from "../../lib/data";
import Image from "next/image";
import chef from "../../../public/icons/chef.png"

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] flex-col border-r border-gray-100 bg-white px-6 py-8 shadow-card md:flex fixed left-0 top-0 overflow-y-auto custom-scrollbar z-50">
      
      {/* 1. Logo Section */}
      <div className="mb-10 px-2">
        <h1 className="text-3xl font-bold text-text-primary">
          Sedap<span className="text-primary">.</span>
        </h1>
        <p className="mt-1 text-[10px] text-text-muted font-medium">
          Modern Admin Dashboard
        </p>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-primary-light text-primary" // Active state (Light Green bg + Dark Green Text)
                  : "text-text-secondary hover:bg-gray-50 hover:text-primary"
              )}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-colors", isActive ? "text-primary" : "text-text-muted group-hover:text-primary")} 
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 3. Promo Card (Chef Image Wala) */}
  {/* 3. Promo Card */}
      <div className="mt-8 relative w-full overflow-hidden rounded-xl bg-primary px-4 py-16 shadow-lg shadow-primary/20 ">
        
        {/* Background Patterns (Decoration) */}
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex items-center justify-between -mt-10 ">
            {/* Left Side: Text & Button */}
            <div className="flex-1 pr-6 z-20"> 
                <p className="mb-2 text-[10px] font-sm text-white/90 leading-relaxed">
                  Please, organize your menus through button below!
                </p>
                <Button 
                  className="w-[120px] bg-white text-text-primary hover:bg-gray-100 text-[10px] font-bold rounded-lg shadow-sm border-none transition-transform active:scale-95"
                >
                  +Add Menus
                </Button>
            </div>
            
            {/* Right Side: Chef Image */}
            <div className="absolute -right-17 top-17 -translate-y-1/2 h-32 w-32 translate-x-2 z-10 pointer-events-none"> 
               <Image 
                 src={chef}
                 alt="Chef" 
                 width={60} 
                 height={60}
                 className=" object-contain drop-shadow-lg"
                 priority
               />
            </div>
        </div>
      </div>
      {/* 4. Copyright */}
      <div className="mt-6 text-center">
        <p className="text-[10px] text-text-muted">
          Sedap Restaurant Admin Dashboard <br /> © 2026 All Rights Reserved
        </p>
      </div>
    </aside>
  );
};