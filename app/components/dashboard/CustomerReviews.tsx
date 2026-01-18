"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { CUSTOMER_REVIEWS } from "../../lib/data"; // ✅ Data imported from central file
import { cn } from "../../lib/utils";

export const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic: Hum ek waqt mein 3 cards dikhayenge desktop par
  // Mobile par 1, Tablet par 2.
  // Filhal logic simple rakhte hain: 
  const itemsPerPage = 3; 
  
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= CUSTOMER_REVIEWS.length - (itemsPerPage - 1) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? CUSTOMER_REVIEWS.length - itemsPerPage : prev - 1
    );
  };

  // Visible items nikalna based on index
  // Ye slice logic ensure karega ke hum sahi items dikhayen
  const visibleReviews = CUSTOMER_REVIEWS.slice(currentIndex, currentIndex + itemsPerPage);
  
  // Agar items kam hain to wrap around logic (Optional, simple slice for now)
  // Note: Production slider libraries (Swiper) complex hoti hain, 
  // ye custom "Window" logic hai.

  return (
    <div className="mt-8">
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Customer Review</h3>
          <p className="mt-1 text-sm text-text-muted">Eum fuga consequuntur utadsjn et.</p>
        </div>
        
        {/* Navigation Buttons (Functional) */}
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm hover:bg-gray-50 hover:shadow-md transition-all active:scale-95"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <button 
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-sm hover:bg-gray-50 hover:shadow-md transition-all active:scale-95"
          >
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Reviews Grid / Slider View */}
      {/* Hum grid use karenge lekin data dynamic hoga jo visibleReviews se aayega */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500">
        
        {visibleReviews.map((review) => (
          <div key={review.id} className="relative flex overflow-hidden rounded-3xl bg-white p-6 shadow-card transition-all hover:-translate-y-1">
            
            {/* Left Content */}
            <div className="relative z-10 flex-1 pr-16">
              {/* User Info */}
              <div className="mb-4 flex items-center gap-3">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-text-primary">{review.name}</h4>
                  <span className="text-xs text-text-muted">{review.time}</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="mb-4 text-xs font-medium leading-relaxed text-text-secondary line-clamp-3">
                {review.text}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-warning">
                  {[1, 2, 3, 4, 5].map((star) => (
                     <Star 
                       key={star} 
                       size={16} 
                       fill={star <= Math.floor(review.rating) ? "currentColor" : "none"} 
                       className={cn(star <= Math.floor(review.rating) ? "text-warning" : "text-gray-200")}
                       strokeWidth={star <= Math.floor(review.rating) ? 0 : 2}
                     />
                  ))}
                </div>
                <span className="text-sm font-bold text-text-primary">{review.rating}</span>
              </div>
            </div>

            {/* Right Side: Food Plate Image */}
            <div className="absolute -right-6 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full shadow-lg">
               <img 
                 src={review.foodImage} 
                 alt="food" 
                 className="h-full w-full rounded-full object-cover border-4 border-white"
               />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};