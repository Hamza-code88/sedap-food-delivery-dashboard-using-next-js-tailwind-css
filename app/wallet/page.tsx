"use client";

import React from "react";
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import { WALLET_TRANSACTIONS } from "../lib/data";

export default function WalletPage() {
  return (
    <div className="space-y-8">
      
      {/* Top Section: Card & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Green Credit Card */}
         <div className="relative h-60 w-full rounded-[32px] overflow-hidden p-8 text-white shadow-xl shadow-[#10B981]/30 group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#059669] z-0"></div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl z-0"></div>
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl z-0"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex justify-between items-start">
                  <div>
                     <p className="text-green-100 text-sm font-medium">Total Balance</p>
                     <h2 className="text-4xl font-extrabold mt-1">$12,450.00</h2>
                  </div>
                  <Wallet size={32} className="opacity-80" />
               </div>
               
               <div className="flex justify-between items-end">
                  <div>
                     <p className="text-green-100 text-xs mb-1">Card Holder</p>
                     <p className="font-bold text-lg tracking-wide">SAMANTHA W.</p>
                  </div>
                  <div className="text-right">
                      <p className="font-bold text-xl">VISA</p>
                      <p className="text-xs opacity-80">**** **** **** 4567</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Quick Stats */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 flex flex-col justify-center">
               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#10B981] mb-3">
                  <ArrowDownLeft size={20} />
               </div>
               <p className="text-text-secondary text-sm">Total Income</p>
               <h3 className="text-2xl font-bold text-text-primary">$24,500</h3>
            </div>
            <div className="bg-white p-6 rounded-[32px] border border-gray-50 flex flex-col justify-center">
               <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-3">
                  <ArrowUpRight size={20} />
               </div>
               <p className="text-text-secondary text-sm">Total Expense</p>
               <h3 className="text-2xl font-bold text-text-primary">$5,240</h3>
            </div>
            {/* Add Money Button */}
            <button className="col-span-2 flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-[24px] font-bold shadow-lg hover:scale-[1.02] transition-transform">
               <Plus size={20} /> Top Up Wallet
            </button>
         </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-text-primary">Recent Transactions</h3>
            <button className="text-sm font-bold text-primary">View All</button>
         </div>
         
         <div className="space-y-4">
            {WALLET_TRANSACTIONS.map((item) => (
               <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.type === 'Income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {item.type === 'Income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                     </div>
                     <div>
                        <p className="font-bold text-text-primary text-sm">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.date}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`font-bold text-sm ${item.type === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                        {item.amount}
                     </p>
                     <p className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                     }`}>
                        {item.status}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}