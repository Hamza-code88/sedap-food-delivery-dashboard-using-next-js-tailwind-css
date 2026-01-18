"use client";

import React from "react";
// IMPORT 'Cell' ADDED HERE
import {
  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const revenueData = [
  { name: "Jan", y2020: 30, y2021: 45 },
  { name: "Feb", y2020: 45, y2021: 35 },
  { name: "Mar", y2020: 35, y2021: 55 },
  { name: "Apr", y2020: 50, y2021: 40 },
  { name: "May", y2020: 40, y2021: 60 },
  { name: "Jun", y2020: 65, y2021: 45 }, 
  { name: "Jul", y2020: 55, y2021: 50 },
  { name: "Aug", y2020: 45, y2021: 35 },
  { name: "Sept", y2020: 35, y2021: 45 },
  { name: "Oct", y2020: 60, y2021: 30 },
  { name: "Nov", y2020: 65, y2021: 40 },
  { name: "Des", y2020: 60, y2021: 50 },
];

const mapData = [
  { name: "Sun", value: 60, color: "#FF5B5B" },
  { name: "Sun", value: 80, color: "#FFB572" },
  { name: "Sun", value: 40, color: "#FF5B5B" },
  { name: "Sun", value: 70, color: "#FFB572" },
  { name: "Sun", value: 60, color: "#FF5B5B" },
  { name: "Sun", value: 25, color: "#FFB572" },
  { name: "Sun", value: 60, color: "#FF5B5B" },
];

export const ChartsRowTwo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
      
      {/* 3. Total Revenue Section */}
      <div className="rounded-3xl bg-white p-8 shadow-card lg:col-span-2">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-xl font-bold text-text-primary">Total Revenue</h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#2D9CDB]" />
                <span className="text-xs font-bold text-text-primary">2020</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF5B5B]" />
                <span className="text-xs font-bold text-text-primary">2021</span>
             </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              {/* Vertical Lines added to match image */}
              <CartesianGrid vertical={true} horizontal={false} stroke="#F1F1F1" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#BDBDBD' }} 
                dy={15} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#BDBDBD' }} 
                tickFormatter={(value) => `$${value}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Line 
                type="natural" // Creates the smooth 'S' curve
                dataKey="y2020" 
                stroke="#2D9CDB" 
                strokeWidth={4} 
                dot={false} 
                activeDot={{ r: 6, strokeWidth: 4, stroke: 'white' }} 
              />
              <Line 
                type="natural" 
                dataKey="y2021" 
                stroke="#FF5B5B" 
                strokeWidth={4} 
                dot={false} 
                activeDot={{ r: 6, strokeWidth: 4, stroke: 'white' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Customer Map (Bar Chart) */}
      <div className="rounded-3xl bg-white p-8 shadow-card flex flex-col">
         <div className="mb-8 flex items-center justify-between">
           <h3 className="text-xl font-bold text-text-primary">Customer Map</h3>
           <div className="flex gap-2">
             <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-text-primary">
               Weekly <span className="text-[8px] ml-1">▼</span>
             </button>
             <button className="text-text-muted text-xl leading-none">...</button>
           </div>
         </div>

         <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mapData} barSize={12}> {/* Bar Size adjusted */}
                  <CartesianGrid vertical={false} stroke="#F8F8F8" />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#BDBDBD' }} 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#BDBDBD' }}
                    dy={10}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                     {
                        mapData.map((entry, index) => (
                           // Correct Usage of Cell (Capital C)
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                     }
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

    </div>
  );
};