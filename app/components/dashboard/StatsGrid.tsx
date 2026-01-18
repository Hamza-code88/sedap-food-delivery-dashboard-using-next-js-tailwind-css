import React from "react";
import Image from "next/image"; // Image component import
import { DASHBOARD_STATS } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {DASHBOARD_STATS.map((stat) => {
        const isPositive = stat.trend?.isPositive;

        return (
          <div 
            key={stat.id} 
            className="group relative flex items-center p-5 rounded-[12px] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* 1. Big Icon (Left Side) */}
            <div className={cn(
                "flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110", 
                stat.bgColor
            )}>
              <Image 
                src={stat.icon} 
                alt={stat.label} 
                width={50} 
                height={50} 
                className="object-contain"
              />
            </div>
            
            {/* 2. Text Content (Right Side) */}
            <div className="ml-5 flex flex-col justify-center">
              {/* Value */}
              <h3 className="text-4xl font-bold text-text-primary leading-none mb-1">
                {stat.value}
              </h3>
              
              {/* Label */}
              <p className="text-sm font-medium text-text-secondary mb-2">
                {stat.label}
              </p>

              {/* Trend Section (Design: Arrow + % + (30 days)) */}
              {stat.trend && (
                <div className="flex items-center gap-2">
                   {/* Trend Icon Circle */}
                   <div className={cn(
                     "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                     isPositive ? "bg-primary text-white" : "bg-danger text-white"
                   )}>
                     {isPositive ? <ArrowUp size={10} strokeWidth={4} /> : <ArrowDown size={10} strokeWidth={4} />}
                   </div>
                   
                   {/* Percentage & Days */}
                   <span className="text-xs font-medium text-text-secondary">
                     <span className={isPositive ? "text-primary" : "text-danger"}>
                        {stat.trend.value}%
                     </span> 
                     <span className="ml-1 opacity-60">
                        {stat.trend.label}
                     </span>
                   </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};