"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, Filter } from "lucide-react";
import { cn } from "../lib/utils";

// --- UPDATED EVENTS ---
const EVENTS = [
  {
    id: 1,
    day: 5,
    title: "New Year Menu Launch",
    time: "09:00 AM",
    type: "marketing",
    color: "bg-purple-100 text-purple-700 border-purple-500",
  },
  {
    id: 2,
    day: 12,
    title: "Staff Meeting",
    time: "11:30 AM",
    type: "meeting",
    color: "bg-blue-100 text-blue-700 border-blue-500",
    participants: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
    ],
  },
  {
    id: 3,
    day: 23,
    title: "Food Safety Inspection",
    time: "02:00 PM",
    type: "work",
    color: "bg-red-100 text-red-700 border-red-500",
  },
  {
    id: 4,
    day: 24,
    title: "Weekend Catering Prep",
    time: "04:00 PM",
    type: "order",
    color: "bg-green-100 text-green-700 border-green-500",
  },
  {
    id: 5,
    day: 30,
    title: "Monthly Inventory",
    time: "06:00 PM",
    type: "work",
    color: "bg-gray-100 text-gray-700 border-gray-500",
  },
];

export default function CalendarPage() {
  const [view, setView] = useState("Month");

  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentDate(new Date());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!currentDate) {
    return (
      <div className="p-10 text-center text-gray-400">Loading Calendar...</div>
    );
  }

  // --- Ab Calculations safe hain ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[month];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const calendarGrid = [];

  // Empty slots
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push({ day: null, currentMonth: false });
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarGrid.push({ day: i, currentMonth: true });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)]">
      {/* === LEFT SIDEBAR === */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        <button className="w-full bg-[#10B981] text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2 active:scale-95">
          <Plus size={20} /> Create New Event
        </button>

        {/* Mini Calendar */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-text-primary">
              {currentMonthName} {year}
            </span>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft size={16} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center gap-y-2 text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-gray-400 font-bold">
                {d}
              </span>
            ))}

            {/* Mini Grid Logic */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <span
                key={d}
                className={cn(
                  "h-7 w-7 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 font-medium",
                  d === today
                    ? "bg-[#10B981] text-white hover:bg-[#10B981]"
                    : "text-text-secondary",
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Upcoming List */}
        <div className="flex-1 bg-white p-5 rounded-[24px] shadow-sm border border-gray-50 overflow-y-auto custom-scrollbar">
          <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
            <Clock size={18} className="text-[#10B981]" /> Upcoming Events
          </h3>
          <div className="space-y-4">
            {EVENTS.map((evt) => (
              <div
                key={evt.id}
                className={cn(
                  "group flex gap-3 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border-l-2 border-transparent hover:border-[#10B981]",
                  evt.day === today ? "bg-green-50 border-green-500" : "",
                )}
              >
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    {currentMonthName.slice(0, 3)}
                  </span>
                  <span className="text-lg font-bold text-text-primary">
                    {evt.day}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-text-primary line-clamp-1 group-hover:text-[#10B981] transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {evt.time}
                  </p>
                  {evt.day === today && (
                    <span className="text-[10px] font-bold text-green-600 bg-white px-2 py-0.5 rounded-full mt-1 inline-block shadow-sm">
                      Today
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === RIGHT MAIN CONTENT === */}
      <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-gray-50 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-text-primary">
              {currentMonthName} {year}
            </h2>
            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
              <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
              {["Month", "Week", "Day"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    view === v
                      ? "bg-white text-text-primary shadow-sm"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <button className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-500">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Grid Header */}
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, i) => (
            <div
              key={i}
              className="py-4 text-center text-xs font-bold text-gray-400 tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        {/* DYNAMIC GRID */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
          {calendarGrid.map((dateObj, index) => {
            if (!dateObj.day) {
              return (
                <div
                  key={index}
                  className="bg-gray-50/50 border-b border-r border-gray-50 min-h-[120px]"
                ></div>
              );
            }

            const dayEvents = EVENTS.filter((e) => e.day === dateObj.day);
            const isToday = dateObj.day === today;

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[120px] border-b border-r border-gray-50 p-3 relative group transition-colors hover:bg-gray-50/30",
                  "bg-white",
                  isToday ? "bg-green-50/20" : "",
                )}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={cn(
                      "text-sm font-bold h-7 w-7 flex items-center justify-center rounded-full transition-all",
                      isToday
                        ? "bg-[#10B981] text-white shadow-md scale-110"
                        : "text-text-primary",
                    )}
                  >
                    {dateObj.day}
                  </span>

                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-400 transition-opacity">
                    <Plus size={14} />
                  </button>
                </div>

                <div className="mt-2 space-y-1.5">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className={cn(
                        "text-[10px] font-bold px-2 py-1.5 rounded-lg border-l-4 truncate shadow-sm cursor-pointer hover:opacity-80 transition-opacity animate-in fade-in zoom-in duration-300",
                        evt.color,
                      )}
                    >
                      {evt.time} - {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
