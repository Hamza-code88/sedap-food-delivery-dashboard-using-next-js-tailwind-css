"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip } from "lucide-react";
import { CHAT_CONTACTS } from "../lib/data";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState("1"); // Default Active =Chat ID

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden flex">
      
      {/* --- LEFT SIDE: CONTACTS --- */}
      <div className="w-80 border-r border-gray-100 flex flex-col hidden md:flex">
         <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-text-primary mb-4">Messages</h2>
            <div className="relative">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input placeholder="Search contacts..." className="w-full bg-gray-50 pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {CHAT_CONTACTS.map((contact) => (
               <div 
                 key={contact.id} 
                 onClick={() => setActiveChat(contact.id)}
                 className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChat === contact.id ? 'bg-green-50' : 'hover:bg-gray-50'}`}
               >
                  <div className="relative">
                     <Image src={contact.avatar} alt={contact.name} width={40} height={40} className="rounded-full" />
                     {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-0.5">
                        <h4 className={`text-sm font-bold truncate ${activeChat === contact.id ? 'text-primary' : 'text-text-primary'}`}>{contact.name}</h4>
                        <span className="text-[10px] text-text-secondary">{contact.time}</span>
                     </div>
                     <p className="text-xs text-text-secondary truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <div className="w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">{contact.unread}</div>}
               </div>
            ))}
         </div>
      </div>

      {/* --- RIGHT SIDE: CHAT WINDOW --- */}
      <div className="flex-1 flex flex-col bg-[#F9FAFB]">
         
         {/* Chat Header */}
         <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Image src="https://i.pravatar.cc/150?u=1" alt="User" width={40} height={40} className="rounded-full" />
               <div>
                  <h4 className="font-bold text-text-primary">Samantha W.</h4>
                  <p className="text-xs text-green-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online</p>
               </div>
            </div>
            <div className="flex gap-2 text-text-secondary">
               <button className="p-2 hover:bg-gray-100 rounded-full"><Phone size={20}/></button>
               <button className="p-2 hover:bg-gray-100 rounded-full"><Video size={20}/></button>
               <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={20}/></button>
            </div>
         </div>

         {/* Chat Area (Fake Messages) */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Received */}
            <div className="flex gap-3">
               <Image src="https://i.pravatar.cc/150?u=1" alt="User" width={32} height={32} className="rounded-full mt-1 self-end" />
               <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-sm">
                  <p className="text-sm text-text-primary">Hi! I ordered a Spicy Burger 30 mins ago. Is it ready? 🍔</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">10:30 AM</span>
               </div>
            </div>

            {/* Sent */}
            <div className="flex gap-3 flex-row-reverse">
               <div className="bg-primary p-3 rounded-2xl rounded-br-none shadow-md shadow-primary/20 max-w-sm text-white">
                  <p className="text-sm">Yes Samantha! It is being packed right now. The driver will pick it up in 5 mins.</p>
                  <span className="text-[10px] text-green-100 mt-1 block text-right">10:32 AM</span>
               </div>
            </div>
            
            {/* Received */}
            <div className="flex gap-3">
               <Image src="https://i.pravatar.cc/150?u=1" alt="User" width={32} height={32} className="rounded-full mt-1 self-end" />
               <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-sm">
                  <p className="text-sm text-text-primary">Awesome! Thanks for the update. 🔥</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">10:33 AM</span>
               </div>
            </div>
         </div>

         {/* Input Area */}
         <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Paperclip size={20}/></button>
            <div className="flex-1 relative">
               <input placeholder="Type a message..." className="w-full bg-gray-50 pl-4 pr-10 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" />
               <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"><Smile size={20}/></button>
            </div>
            <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-transform active:scale-95">
               <Send size={20} />
            </button>
         </div>

      </div>
    </div>
  );
}