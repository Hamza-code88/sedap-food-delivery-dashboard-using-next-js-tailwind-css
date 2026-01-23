"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ChevronLeft, Star, TrendingUp, DollarSign, 
  ShoppingBag, Save, Clock, Flame, BarChart3 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";

// --- MOCK DATA (Is particular food ke liye) ---
const FOOD_DATA = {
  id: "1",
  name: "Double Cheese Burger",
  price: "12.00",
  category: "Burger",
  description: "Juicy beef patty with double cheddar cheese, fresh lettuce, and our secret sauce.",
  calories: "450 kcal",
  prepTime: "15-20 min",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
  rating: 4.9,
  reviewsCount: 128,
  // --- Analytics Data ---
  totalSales: 1240, 
  revenue: "$14,880",
  growth: "+12.5%",
  reviews: [
    { user: "Ali Khan", comment: "Best burger in town!", rating: 5 },
    { user: "Sara J.", comment: "Thoda spicy tha, but tasty.", rating: 4 },
  ]
};

export default function FoodDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(FOOD_DATA);

  // --- Fake Save Function ---
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert("Food Details Updated Successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-text-secondary transition-colors">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Food Details</h1>
                <p className="text-xs text-text-secondary">Analytics & Edit</p>
            </div>
        </div>
        <div className="bg-green-100 text-[#10B981] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            <TrendingUp size={16} /> Trending Item
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === LEFT COLUMN: EDITOR === */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Hero Image Card */}
            <div className="relative h-72 w-full rounded-[32px] overflow-hidden shadow-card group">
                <Image src={formData.image} alt={formData.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-4xl font-bold mb-2">{formData.name}</h2>
                    <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" /> {formData.rating}
                        </span>
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg">
                            {formData.reviewsCount} Reviews
                        </span>
                        <span className="bg-[#10B981] px-3 py-1.5 rounded-lg font-bold">
                            ${formData.price}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Edit Form */}
            <div className="bg-white p-8 rounded-[32px] shadow-card border border-gray-50 space-y-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-text-primary flex items-center gap-2">
                        <Clock size={18} className="text-text-secondary"/> Edit Information
                    </h3>
                    <Button onClick={handleSave} disabled={loading} className="bg-[#10B981] hover:bg-green-600 text-white rounded-xl font-bold px-6">
                        {loading ? "Saving..." : <><Save size={18} className="mr-2"/> Save Changes</>}
                    </Button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-bold text-text-secondary ml-1">Food Name</label>
                        <input 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-text-primary outline-none focus:ring-2 focus:ring-[#10B981]/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-text-secondary ml-1">Price ($)</label>
                        <input 
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-text-primary outline-none focus:ring-2 focus:ring-[#10B981]/20 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-text-secondary ml-1">Description</label>
                    <textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary outline-none focus:ring-2 focus:ring-[#10B981]/20 resize-none leading-relaxed transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="text-xs font-bold text-text-secondary ml-1">Calories</label>
                        <div className="relative">
                            <Flame size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                            <input value={formData.calories} onChange={(e) => setFormData({...formData, calories: e.target.value})} className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-text-primary outline-none focus:ring-2 focus:ring-[#10B981]/20" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-text-secondary ml-1">Prep Time</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input value={formData.prepTime} onChange={(e) => setFormData({...formData, prepTime: e.target.value})} className="w-full mt-1 bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-text-primary outline-none focus:ring-2 focus:ring-[#10B981]/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* === RIGHT COLUMN: ANALYTICS (Data ka nasha 📈) === */}
        <div className="space-y-6">
            
            {/* 1. Green Revenue Card */}
            <div className="bg-[#10B981] p-6 rounded-[32px] shadow-lg text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                        <BarChart3 size={18} />
                        <span className="text-sm font-bold">Total Revenue</span>
                    </div>
                    <h3 className="text-4xl font-extrabold mb-4 tracking-tight">{formData.revenue}</h3>
                    <div className="flex items-center gap-2 bg-white/20 w-fit px-3 py-1.5 rounded-lg text-sm font-bold backdrop-blur-sm shadow-sm">
                        <TrendingUp size={16} /> {formData.growth} <span className="text-green-50 font-normal opacity-80">vs last month</span>
                    </div>
                </div>
                {/* Decoration Circles */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute top-10 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* 2. Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl w-fit mb-3">
                        <ShoppingBag size={20} />
                    </div>
                    <h4 className="text-2xl font-bold text-text-primary">{formData.totalSales}</h4>
                    <p className="text-xs text-text-secondary font-medium">Total Orders</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl w-fit mb-3">
                        <DollarSign size={20} />
                    </div>
                    <h4 className="text-2xl font-bold text-text-primary">$12</h4>
                    <p className="text-xs text-text-secondary font-medium">Avg. Unit Price</p>
                </div>
            </div>

            {/* 3. Recent Reviews */}
            <div className="bg-white p-6 rounded-[32px] shadow-card border border-gray-50 h-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-text-primary">Recent Reviews</h3>
                    <span className="text-xs font-bold text-[#10B981] bg-green-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-green-100">View All</span>
                </div>
                <div className="space-y-4">
                    {formData.reviews.map((review, i) => (
                        <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                             <div className="flex justify-between items-start mb-1">
                                 <h5 className="font-bold text-sm text-text-primary">{review.user}</h5>
                                 <div className="flex text-yellow-400 bg-yellow-50 px-1.5 py-0.5 rounded-md">
                                     <Star size={10} fill="currentColor"/> 
                                     <span className="text-[10px] text-yellow-700 ml-1 font-bold">{review.rating}.0</span>
                                 </div>
                             </div>
                             <p className="text-xs text-text-secondary leading-relaxed">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}