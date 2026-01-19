"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { NAV_ITEMS } from "../../lib/data";
import Image from "next/image";
import chef from "../../../public/icons/chef.png";
import { ChevronsLeft, ChevronsRight } from "lucide-react"; // MODERN ICONS

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (value: boolean) => void;
}

export const Sidebar = ({ isCollapsed = false, setIsCollapsed }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        // 'overflow-y-auto' yahan se hata diya taaki button cut na ho
        "hidden h-screen flex-col border-r border-gray-100 bg-white shadow-card md:flex fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[100px]" : "w-[280px]"
      )}
    >
      
      {/* --- Toggle Button (Modern Floating Style) --- */}
      {/* Ab ye button 'aside' ka direct child hai aur scroll view se bahar hai */}
      {setIsCollapsed && (
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-9 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
        >
            {isCollapsed ? <ChevronsRight size={18} strokeWidth={2.5} /> : <ChevronsLeft size={18} strokeWidth={2.5} />}
        </button>
      )}

      {/* --- Scrollable Content Wrapper --- */}
      {/* Scroll ab is div ke andar hoga */}
      <div className={cn(
          "flex h-full w-full flex-col overflow-y-auto custom-scrollbar",
          isCollapsed ? "px-4 py-8" : "px-6 py-8"
      )}>

          {/* 1. Logo Section */}
          <div className={cn("mb-10 transition-all duration-300", isCollapsed ? "px-0 flex justify-center" : "px-2")}>
            {isCollapsed ? (
                <h1 className="text-3xl font-bold text-primary">S.</h1>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold text-text-primary whitespace-nowrap">
                      Sedap<span className="text-primary">.</span>
                    </h1>
                    <p className="mt-1 text-[10px] text-text-muted font-medium whitespace-nowrap">
                      Modern Admin Dashboard
                    </p>
                </div>
            )}
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
                    "group flex items-center rounded-xl transition-all duration-200",
                    isCollapsed ? "justify-center p-3" : "gap-4 px-4 py-3.5",
                    isActive
                      ? "bg-primary-light text-primary" 
                      : "text-text-secondary hover:bg-gray-50 hover:text-primary"
                  )}
                >
                  <item.icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn("transition-colors", isActive ? "text-primary" : "text-text-muted group-hover:text-primary")} 
                  />
                  
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
                        {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Promo Card */}
          {!isCollapsed && (
              <div className="mt-8 relative w-full overflow-hidden rounded-xl bg-primary px-4 py-16 shadow-lg shadow-primary/20 animate-in fade-in zoom-in duration-300">
                
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 flex items-center justify-between -mt-10 ">
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
          )}

          {/* 4. Copyright */}
          {!isCollapsed && (
              <div className="mt-6 text-center whitespace-nowrap overflow-hidden">
                <p className="text-[10px] text-text-muted">
                  Sedap Restaurant Admin Dashboard <br /> © 2026 All Rights Reserved
                </p>
              </div>
          )}
      </div>
    </aside>
  );
};