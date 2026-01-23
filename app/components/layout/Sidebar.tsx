"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { NAV_ITEMS } from "../../lib/data";
import Image from "next/image";
import chef from "../../../public/icons/chef.png";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react"; 

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (value: boolean) => void;
  // New Props for Mobile
  isMobileOpen?: boolean;
  setIsMobileOpen?: (value: boolean) => void;
}

export const Sidebar = ({ 
    isCollapsed = false, 
    setIsCollapsed, 
    isMobileOpen = false, 
    setIsMobileOpen 
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* --- MOBILE OVERLAY (Black background) --- */}
      {/* Ye sirf mobile pe dikhega jab menu open hoga */}
      <div 
        className={cn(
            "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden",
            isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
      />

      {/* --- SIDEBAR --- */}
      <aside 
        className={cn(
          // 'hidden' hata diya. Ab ye hamesha render hoga lekin mobile pe translate se control hoga
          "fixed left-0 top-0 z-50 h-screen flex-col border-r border-gray-100 bg-white shadow-card transition-transform duration-300 ease-in-out",
          // Desktop Logic:
          isCollapsed ? "md:w-[100px]" : "md:w-[280px]",
          // Mobile Logic: Agar mobile open hai to show karo (translate-x-0), warna chupa do (-translate-x-full)
          // MD (Desktop) pe hamesha show karo (md:translate-x-0)
          isMobileOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0"
        )}
      >
        
        {/* --- Mobile Close Button (X) --- */}
        <div className="absolute right-4 top-4 md:hidden">
            <button 
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className="p-1 text-gray-500 hover:text-red-500"
            >
                <X size={24} />
            </button>
        </div>

        {/* --- Desktop Toggle Button --- */}
        {setIsCollapsed && (
          <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex absolute -right-3 top-9 z-50 h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-primary shadow-md hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
          >
              {isCollapsed ? <ChevronsRight size={18} strokeWidth={2.5} /> : <ChevronsLeft size={18} strokeWidth={2.5} />}
          </button>
        )}

        {/* --- Scrollable Content Wrapper --- */}
        <div className={cn(
            "flex h-full w-full flex-col overflow-y-auto custom-scrollbar",
            // Mobile pe hamesha full padding, Desktop pe conditional
            isCollapsed ? "md:px-4 md:py-8 px-6 py-8" : "px-6 py-8"
        )}>

            {/* 1. Logo Section */}
            <div className={cn("mb-10 transition-all duration-300", isCollapsed ? "md:px-0 md:flex md:justify-center" : "px-2")}>
              {isCollapsed ? (
                 // Desktop Collapsed Logo
                 <h1 className="hidden md:block text-3xl font-bold text-primary">S.</h1>
              ) : null}

              {/* Full Logo (Mobile pe hamesha yehi dikhega ya Desktop Expanded pe) */}
              <div className={cn(isCollapsed ? "md:hidden" : "block")}>
                  <h1 className="text-3xl font-bold text-text-primary whitespace-nowrap">
                    Sedap<span className="text-primary">.</span>
                  </h1>
                  <p className="mt-1 text-[10px] text-text-muted font-medium whitespace-nowrap">
                    Modern Admin Dashboard
                  </p>
              </div>
            </div>

            {/* 2. Navigation Links */}
            <nav className="flex-1 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    // Link click karny par mobile menu band hojaye
                    onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                    className={cn(
                      "group flex items-center rounded-xl transition-all duration-200",
                      isCollapsed ? "md:justify-center md:p-3 px-4 py-3.5 gap-4" : "gap-4 px-4 py-3.5",
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
                    
                    <span className={cn(
                        "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                        // Mobile pe hamesha dikhao, Desktop collapsed pe chupao
                        isCollapsed ? "md:hidden" : "block"
                    )}>
                        {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* 3. Promo Card (Hidden on Desktop Collapse, Visible on Mobile) */}
            <div className={cn(isCollapsed ? "md:hidden" : "block", "mt-auto")}>
                <div className="mt-8 relative w-full overflow-hidden rounded-xl bg-primary px-4 py-16 shadow-lg shadow-primary/20">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -left-6 bottom-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

                  <div className="relative z-10 flex items-center justify-between -mt-10 ">
                      <div className="flex-1 pr-6 z-20"> 
                          <p className="mb-2 text-[10px] font-sm text-white/90 leading-relaxed">
                            Please, organize your menus through button below!
                          </p>
                          <Button className="w-[120px] bg-white text-text-primary hover:bg-gray-100 text-[10px] font-bold rounded-lg shadow-sm border-none">
                            +Add Menus
                          </Button>
                      </div>
                      <div className="absolute -right-17 top-17 -translate-y-1/2 h-32 w-32 translate-x-2 z-10 pointer-events-none"> 
                        <Image src={chef} alt="Chef" width={60} height={60} className="object-contain drop-shadow-lg" />
                      </div>
                  </div>
                </div>
            </div>

            {/* 4. Copyright */}
            <div className={cn("mt-6 text-center whitespace-nowrap overflow-hidden", isCollapsed ? "md:hidden" : "block")}>
              <p className="text-[10px] text-text-muted">
                Sedap Restaurant Admin Dashboard <br /> © 2026 All Rights Reserved
              </p>
            </div>
        </div>
      </aside>
    </>
  );
};