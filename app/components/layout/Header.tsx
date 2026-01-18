import React from "react";
import Image from "next/image"; 
import { Search, Bell, MessageSquare, Gift, Settings } from "lucide-react";
import adminImg from "../../../public/admin.png" // Make sure path is correct

export const Header = () => {
  return (
    // FIX 1: 'md:pl-[300px]' hata diya. Ab ye layout ki padding use karega.
    <header className="sticky top-0 z-40 flex h-24 items-center justify-between bg-background px-8 py-4 gap-4">
      
      {/* Search Input Section */}
      <div className="hidden flex-1 md:block">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-2xl border-none bg-white py-4 pl-4 pr-12 text-sm font-medium text-text-primary shadow-sm outline-none ring-1 ring-gray-100 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex w-auto shrink-0 items-center justify-end gap-6">
        
        {/* Icons Grid with Number Badges */}
        <div className="flex items-center gap-3">
            {/* Bell - 21 */}
            <button className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F7FF] text-[#0095FF] hover:opacity-80 transition-opacity">
              <Bell size={24} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0095FF] text-[10px] font-bold text-white border-2 border-white">
                21
              </span>
            </button>

            {/* Chat - 53 */}
            <button className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F7FF] text-[#0095FF] hover:opacity-80 transition-opacity">
              <MessageSquare size={24} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0095FF] text-[10px] font-bold text-white border-2 border-white">
                53
              </span>
            </button>

            {/* Gift - 15 */}
            <button className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F1FF] text-[#8F73F6] hover:opacity-80 transition-opacity">
              <Gift size={24} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8F73F6] text-[10px] font-bold text-white border-2 border-white">
                15
              </span>
            </button>

            {/* Settings - 19 */}
            <button className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFEAEA] text-[#FF5B5B] hover:opacity-80 transition-opacity">
              <Settings size={24} strokeWidth={2} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5B5B] text-[10px] font-bold text-white border-2 border-white">
                19
              </span>
            </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-gray-200 hidden md:block" />

        {/* User Profile */}
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="hidden text-right md:block">
            <p className="text-sm text-text-primary">Hello, <span className="font-bold">Samantha</span></p>
          </div>
          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
            <Image 
              src={adminImg} 
              alt="Profile" 
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};