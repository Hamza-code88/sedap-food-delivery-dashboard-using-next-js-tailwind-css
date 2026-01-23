"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, 
  Users, Calendar, ChevronDown, ArrowUpRight 
} from "lucide-react";
import { FOOD_ITEMS, ANALYTICS_STATS } from "../lib/data"; // 👈 IMPORT
import { RevenueChart } from "../components/analytics/RevenueChart";

export default function AnalyticsPage() {
 const [timeRange] = useState("Yearly"); 

  // Destructure Data (No Hardcoding)
  const { 
    totalRevenue, revenueGrowth, 
    totalOrders, ordersGrowth, 
    totalCustomers, customersGrowth 
  } = ANALYTICS_STATS;

  return (
    <div className="space-y-8">
      {/* Header (Same) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-text-primary">Analytics Overview</h1>
           <p className="text-sm text-text-secondary mt-1">Monitor your business performance.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-text-primary shadow-sm hover:bg-gray-50">
           <Calendar size={18} className="text-text-secondary" /> {timeRange} <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Revenue */}
         <div className="bg-[#10B981] p-6 rounded-[32px] text-white relative overflow-hidden shadow-lg group">
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4 opacity-90">
                  <div className="p-2 bg-white/20 rounded-full"><DollarSign size={20} /></div>
                  <span className="font-bold">Total Revenue</span>
               </div>
               <h2 className="text-4xl font-extrabold mb-2">{totalRevenue}</h2>
               <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-3 py-1 rounded-lg">
                  <TrendingUp size={16} /> {revenueGrowth} <span className="opacity-70 font-normal">vs last year</span>
               </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
         </div>

         {/* Orders */}
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
               <div className="p-2 bg-orange-50 text-orange-500 rounded-full"><ShoppingBag size={20} /></div>
               <span className="font-bold text-text-secondary">Total Orders</span>
            </div>
            <h2 className="text-4xl font-extrabold text-text-primary mb-2">{totalOrders}</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-green-500 bg-green-50 w-fit px-3 py-1 rounded-lg">
               <TrendingUp size={16} /> {ordersGrowth}
            </div>
         </div>

         {/* Customers */}
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
               <div className="p-2 bg-blue-50 text-blue-500 rounded-full"><Users size={20} /></div>
               <span className="font-bold text-text-secondary">Total Customers</span>
            </div>
            <h2 className="text-4xl font-extrabold text-text-primary mb-2">{totalCustomers}</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-red-500 bg-red-50 w-fit px-3 py-1 rounded-lg">
               <TrendingDown size={16} /> {customersGrowth}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Revenue Chart */}
         <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-xl text-text-primary">Revenue Analytics</h3>
               <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                     <span className="w-3 h-3 rounded-full bg-[#10B981]"></span> Income
                  </span>
               </div>
            </div>
            <RevenueChart />
         </div>

         {/* Trending Menu */}
         <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50">
            <h3 className="font-bold text-xl text-text-primary mb-6">Trending Menu</h3>
            <div className="space-y-6">
               {FOOD_ITEMS.slice(0, 5).map((food, idx) => (
                  <div key={food.id} className="flex items-center gap-4">
                     <span className="font-bold text-gray-300 text-lg w-4">#{idx + 1}</span>
                     <div className="h-12 w-12 rounded-xl overflow-hidden relative shrink-0">
                        <Image src={food.image} alt={food.name} fill className="object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-text-primary text-sm line-clamp-1">{food.name}</h4>
                        <p className="text-xs text-text-secondary">{food.reviews} orders</p>
                     </div>
                     <div className="text-right">
                        <p className="font-bold text-[#10B981] text-sm">{food.price}</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-gray-100 text-sm font-bold text-text-primary hover:bg-gray-50 flex items-center justify-center gap-2">
               View All Items <ArrowUpRight size={16} />
            </button>
         </div>
      </div>
    </div>
  );
}