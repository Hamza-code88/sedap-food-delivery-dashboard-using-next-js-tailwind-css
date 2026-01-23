"use client";

import React, { useState, useRef } from "react";
import { X, Sparkles, Loader2, UploadCloud } from "lucide-react";
import { Button } from "../../components/ui/Button";
import Image from "next/image";
import { FoodItem } from "../../types"; // Type import kar lo

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: FoodItem) => void; // ✨ NEW: Save function prop
}

export const AddMenuModal = ({ isOpen, onClose, onSave }: AddMenuModalProps) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 📸 Handle Image ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // --- 🤖 AI Magic ---
  const handleAutoFill = async () => {
    if (!name) return alert("Pehle Food ka naam likho!");
    setAiLoading(true);
    try {
      const res = await fetch("/api/generate-menu", {
        method: "POST",
        body: JSON.stringify({ foodName: name }),
      });
      const data = await res.json();
      if (data.description) {
        setDesc(data.description);
        setPrice(data.price.replace('$', ''));
        setCalories(data.calories);
      }
    } catch (e) { console.error(e); } 
    finally { setAiLoading(false); }
  };

  // --- 💾 Handle Save (Real Action) ---
  const handleSaveClick = () => {
    if (!name || !price) return alert("Name aur Price zaroori hain!");

    // Naya item create karo
    const newItem: FoodItem = {
        id: Date.now().toString(), // Random ID
        name,
        category: "Snacks", // Filhal default, ya dropdown laga sakte ho
        price: `$${price}`,
        description: desc || "No description",
        rating: 5.0, // Naye item ki rating full rakhte hain ;)
        reviews: 0,
        image: imagePreview || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" // Fallback Image
    };

    onSave(newItem); // Parent ko data bhejo
    
    // Form Reset karo
    setName(""); setDesc(""); setPrice(""); setCalories(""); setImagePreview(null);
    onClose(); // Modal band
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-200 border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-text-primary">Add New Menu Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
        </div>

        {/* Form Inputs (Same as before) */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div onClick={() => fileInputRef.current?.click()} className="relative border-2 border-dashed border-gray-200 rounded-2xl h-40 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer bg-gray-50 overflow-hidden group">
             {imagePreview ? <Image src={imagePreview} alt="Preview" fill className="object-cover" /> : <><div className="p-3 bg-white rounded-full shadow-sm mb-2"><UploadCloud size={24} /></div><span className="text-xs font-bold">Click to upload image</span></>}
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Name + AI */}
          <div>
            <label className="text-xs font-bold text-text-secondary ml-1">Food Name</label>
            <div className="flex gap-2 mt-1">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Spicy BBQ Burger" className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" />
              <button onClick={handleAutoFill} disabled={aiLoading || !name} className="bg-gradient-to-r from-primary to-green-400 text-white px-4 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 transition-all text-xs">
                {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} {aiLoading ? "..." : "Auto-Fill"}
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
             <label className="text-xs font-bold text-text-secondary ml-1">Description</label>
             <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} placeholder="Description..." className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          </div>

          {/* Price & Calories */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold text-text-secondary ml-1">Price ($)</label>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="0.00" className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 font-bold" />
             </div>
             <div>
                <label className="text-xs font-bold text-text-secondary ml-1">Calories</label>
                <input value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g. 450 kcal" className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50" />
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-8">
           <Button onClick={onClose} className="flex-1 bg-gray-100 text-text-primary hover:bg-gray-200 border-none rounded-xl h-11 font-bold">Cancel</Button>
           
           {/* ✨ Is Button par Function lagaya */}
           <Button onClick={handleSaveClick} className="flex-1 bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 rounded-xl h-11 font-bold">
             Save Item
           </Button>
        </div>

      </div>
    </div>
  );
};