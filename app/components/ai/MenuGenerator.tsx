"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Sparkles, Loader2, Flame, X } from "lucide-react";

interface GeneratedMenuData {
  price: string;
  description: string;
  calories: string;
}

interface MenuGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuGenerator = ({ isOpen, onClose }: MenuGeneratorProps) => {
  const [food, setFood] = useState("");
  const [loading, setLoading] = useState(false);

  // ✨ FIX 2: 'any' hata kar proper Type lagaya
  const [data, setData] = useState<GeneratedMenuData | null>(null);

  const generate = async () => {
    if (!food) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-menu", {
        method: "POST",
        body: JSON.stringify({ foodName: food }),
      });
      const result = await res.json();

      if (result.error) {
        alert("Error: " + result.error);
      } else {
        // Result ko set kar rahe hain
        setData(result);
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Check console.");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all p-4">
      <div className="w-full max-w-md scale-100 transform rounded-3xl bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">
              AI Menu Creator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-text-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Input Area */}
        <div className="flex gap-2 mb-6">
          <input
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="e.g. Spicy Beef Burger"
            className="flex-1 rounded-xl bg-gray-50 border-none px-4 py-3 text-sm font-medium outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-primary/50"
          />
          <Button
            onClick={generate}
            disabled={loading}
            className="rounded-xl px-6 py-3 h-auto font-bold shadow-none"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Go"}
          </Button>
        </div>

        {/* Result Area */}
        {data && (
          <div className="animate-in fade-in zoom-in duration-300 rounded-2xl bg-gray-50 p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-text-primary text-xl capitalize">
                {food}
              </h4>
              <span className="text-primary font-bold bg-primary-light px-3 py-1 rounded-lg text-sm">
                {data.price}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {data.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-500 bg-orange-50 w-fit px-3 py-1.5 rounded-full border border-orange-100">
              <Flame size={14} fill="currentColor" /> {data.calories}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
