"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // 👈 IMPORT ADDED
import { Search, Plus, Star, Edit2 } from "lucide-react";
import { FOOD_ITEMS } from "../lib/data";
import { AddMenuModal } from "../components/foods/AddMenuModal";
import { cn } from "../lib/utils";
import { FoodItem } from "../types";

const CATEGORIES = ["All", "Pizza", "Burger", "Snacks", "Drinks"];

export default function FoodsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // ✨ STATE add kiya taaki naye items store ho sakein
  const [foods, setFoods] = useState<FoodItem[]>(FOOD_ITEMS);

  // ✨ ADD Function
  const handleAddNewFood = (newItem: FoodItem) => {
    setFoods([newItem, ...foods]);
  };

  // ✨ Filtering Logic
  const filteredFoods = foods.filter((food) => {
    const matchesCategory = activeCategory === "All" || food.category === activeCategory;
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      <AddMenuModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddNewFood} 
      />

      {/* --- Header Area --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Menu Management</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your food items and categories.</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search food..."
               className="pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:border-primary w-full md:w-64 text-sm font-medium shadow-sm"
             />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:bg-green-600 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add New
          </button>
        </div>
      </div>

      {/* --- Category Tabs --- */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
         <div className="flex gap-3">
            {CATEGORIES.map((cat) => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
                activeCategory === cat 
                    ? "bg-[#10B981] text-white shadow-lg shadow-primary/20" 
                    : "bg-white text-text-secondary hover:bg-gray-50 border border-gray-100 shadow-sm"
                )}
            >
                {cat}
            </button>
            ))}
         </div>
      </div>

      {/* --- Food Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <div key={food.id} className="group bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 animate-in fade-in zoom-in duration-300">
            
            {/* 👇 LINK ADDED HERE - Clicking image/card takes to details page */}
            <Link href={`/foods/${food.id}`}>
                <div className="relative h-48 w-full mb-4 cursor-pointer">
                    <div className="absolute inset-0 bg-gray-100 rounded-[24px] overflow-hidden shadow-inner">
                        <Image 
                            src={food.image} 
                            alt={food.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                    </div>
                    
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-text-primary">{food.rating}</span>
                    </div>
                </div>
            </Link>

            <div className="px-2 pb-2">
               <Link href={`/foods/${food.id}`}>
                   <h3 className="font-bold text-text-primary line-clamp-1 text-lg mb-1 hover:text-[#10B981] transition-colors cursor-pointer">{food.name}</h3>
               </Link>
               <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed h-[2.5em] mb-4">
                 {food.description}
               </p>
               
               <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-[#10B981]">{food.price}</span>
                  
                  <div className="flex gap-2">
                     <Link href={`/foods/${food.id}`}>
                         <button className="h-9 w-9 flex items-center justify-center bg-gray-50 text-text-secondary rounded-xl hover:bg-[#10B981] hover:text-white transition-all">
                            <Edit2 size={16} />
                         </button>
                     </Link>
                  </div>
               </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}