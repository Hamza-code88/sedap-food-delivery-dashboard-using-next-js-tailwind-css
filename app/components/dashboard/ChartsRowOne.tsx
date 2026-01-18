"use client";

import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// --- Mock Data for Chart Order (Wave) ---
const orderData = [
  { name: "Sun", value: 40 },
  { name: "Mon", value: 60 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 80 },
  { name: "Thu", value: 55 },
  { name: "Fri", value: 75 },
  { name: "Sat", value: 90 },
];

// --- Improved Circular Progress ---
const CircularProgress = ({ value, color, label }: { value: number; color: string; label: string }) => {
  const size = 120; // Circle Size
  const strokeWidth = 12; // Circle Thickness (Mota kiya)
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* SVG Circle */}
        <svg className="h-full w-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#F1F1F1"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" // Round edges
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Percentage Text */}
        <span className="absolute text-2xl font-bold text-text-primary">{value}%</span>
      </div>
      <span className="text-sm font-medium text-text-primary">{label}</span>
    </div>
  );
};

export const ChartsRowOne = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      
      {/* 1. Pie Chart Section */}
      <div className="rounded-3xl bg-white p-8 shadow-card flex flex-col justify-between">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-primary">Pie Chart</h3>
          <div className="flex items-center gap-4">
            {/* Custom Checkboxes look */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border border-gray-300 bg-transparent" />
              <span className="text-xs text-text-secondary">Chart</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-4 w-4 items-center justify-center rounded bg-[#FF5B5B]/20">
                 <div className="h-2 w-2 rounded-sm bg-[#FF5B5B]" />
              </div>
              <span className="text-xs text-text-secondary">Show Value</span>
            </div>
            <button className="pb-2 text-2xl leading-none text-text-muted hover:text-text-primary">...</button>
          </div>
        </div>

        {/* Circles Container */}
        <div className="flex flex-wrap items-center justify-around gap-4 py-4">
          <CircularProgress value={81} color="#FF5B5B" label="Total Order" />
          <CircularProgress value={22} color="#00B074" label="Customer Growth" />
          <CircularProgress value={62} color="#2D9CDB" label="Total Revenue" />
        </div>
      </div>

      {/* 2. Chart Order Section */}
      <div className="rounded-3xl bg-white p-8 shadow-card flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-text-primary">Chart Order</h3>
            <p className="mt-1 text-xs text-text-muted">Lorem ipsum dolor sit amet</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-light">
             Save Report
          </button>
        </div>

        <div className="relative h-64 w-full">
           {/* Tooltip Overlay Mockup */}
          <div className="absolute left-[45%] top-0 z-10 -translate-x-1/2 rounded-xl bg-white px-4 py-2 shadow-lg border border-gray-100">
             <p className="text-lg font-bold text-text-primary">456 <span className="text-xs font-normal text-text-secondary">Order</span></p>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={orderData}>
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip 
                cursor={{ stroke: '#2D9CDB', strokeWidth: 1, strokeDasharray: '5 5' }}
                contentStyle={{ display: 'none' }} // Hiding default tooltip to match design static tooltip
              />
              <Area 
                type="natural" // Makes curves smoother like the image
                dataKey="value" 
                stroke="#2D9CDB" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorBlue)" 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#BDBDBD' }} 
                dy={10} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};