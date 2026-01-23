"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic"; // Map ke liye zaroori
import { 
  Printer, FileText, ChefHat, Bell, Truck, Check, Loader2 
} from "lucide-react";
import { ORDER_DETAIL_MOCK } from "../../lib/data";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";

// --- 🗺️ Map ko Lazy Load karna zaroori hai Next.js mein ---
const OrderMap = dynamic(() => import("../../components/order/OrderMap"), { 
  ssr: false, // Server Side Rendering OFF
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>
});

// --- Helper Components ---
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white rounded-3xl p-6 shadow-sm", className)}>
    {children}
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-white rounded-2xl px-6 py-4 shadow-sm mb-4">
    <h3 className="font-bold text-lg text-text-primary">{title}</h3>
  </div>
);

export default function OrderDetailsPage() {
  const router = useRouter();
  const data = ORDER_DETAIL_MOCK;
  const [isPrinting, setIsPrinting] = useState(false);

  // --- 🖨️ Function: Print Receipt ---
  const handlePrint = () => {
    window.print(); // Browser ka Print Dialog kholega
  };

  // --- 📄 Function: Generate Invoice ---
  const handleInvoice = () => {
    setIsPrinting(true);
    // Fake loading simulation (2 seconds)
    setTimeout(() => {
        setIsPrinting(false);
        alert("Invoice Downloaded! (Simulated)"); 
        // Real app mein yahan 'jspdf' use hota hai
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* --- Top Bar --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-text-primary">Order Details</h1>
          <div className="bg-[#10B981] text-white px-4 py-1.5 rounded-full text-sm font-bold w-fit shadow-md">
            Status: {data.status}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-text-primary rounded-full font-bold shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95"
          >
            <Printer size={18} /> Print Receipt
          </button>
          
          <button 
            onClick={handleInvoice}
            disabled={isPrinting}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95 disabled:opacity-70"
          >
            {isPrinting ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
            {isPrinting ? "Generating..." : "Generate Invoice"}
          </button>
        </div>
      </div>

      {/* --- Main Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === LEFT COLUMN === */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader title="Customer Information" />

          {/* Profile & Timeline Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="md:col-span-3 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full border-4 border-[#10B981] p-0.5 relative">
                   <Image src={data.customer.avatar} alt="User" fill className="object-cover rounded-full" />
                </div>
                <div>
                   <h3 className="font-bold text-xl text-text-primary">{data.customer.name}</h3>
                   <p className="text-sm text-text-secondary">{data.customer.email}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm text-text-secondary mt-2">
                 <p className="leading-relaxed whitespace-pre-line">{data.customer.address}</p>
              </div>
            </Card>

            <Card className="md:col-span-2 bg-[#F3F4F6]/50">
                <div className="relative space-y-6 pl-2">
                   <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-200"></div>
                   {data.timeline.map((step, idx) => (
                       <div key={idx} className="relative flex items-center gap-4 z-10">
                          <div className={cn(
                             "h-10 w-10 rounded-full flex items-center justify-center border-2 shadow-sm shrink-0",
                             step.completed ? "bg-[#10B981] border-[#10B981] text-white" : "bg-white border-gray-300 text-gray-300"
                          )}>
                             {step.icon === "Check" && <Check size={16} />}
                             {step.icon === "Chef" && <ChefHat size={18} />}
                             {step.icon === "Bell" && <Bell size={18} />}
                             {step.icon === "Truck" && <Truck size={18} />}
                          </div>
                          <div>
                             <p className={cn("text-sm font-bold", step.completed ? "text-text-primary" : "text-gray-400")}>{step.status}</p>
                             <p className="text-xs text-gray-400">{step.time}</p>
                          </div>
                       </div>
                   ))}
                </div>
            </Card>
          </div>

          <SectionHeader title="Order Progress" />

          {/* 🗺️ LIVE MAP SECTION (REAL MAP) */}
          <Card className="p-0 overflow-hidden relative h-[300px] border border-gray-100 z-0">
             {/* Map Component Load Hoga */}
             <div className="h-full w-full">
                <OrderMap />
             </div>

             {/* Live Map Button Overlay */}
             <div className="absolute bottom-4 left-4 z-[400]">
                <button className="bg-[#10B981] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-green-600 transition-all hover:scale-105 active:scale-95">
                    Live Tracking
                </button>
             </div>
          </Card>
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="space-y-6">
          <SectionHeader title="Order Summary" />
          
          <Card className="space-y-6">
             <div className="space-y-6">
                {data.items.map((item) => (
                   <div key={item.id} className="flex items-start justify-between pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex gap-4">
                         <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                            {item.name.includes("Burger") ? "🍔" : "🍟"}
                         </div>
                         <div>
                            <p className="font-bold text-text-primary text-sm">{item.name}</p>
                            <p className="text-xs text-text-secondary mt-1">{item.description}</p>
                         </div>
                      </div>
                      <div className="text-right shrink-0">
                         <p className="text-xs text-text-secondary mb-1">x{item.quantity}</p>
                         <p className="font-bold text-text-primary">${item.price}</p>
                      </div>
                   </div>
                ))}
             </div>

             <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm text-text-secondary">
                   <span>Subtotal</span><span className="font-bold text-text-primary">${data.summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                   <span>Tax (10%)</span><span className="font-bold text-text-primary">${data.summary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                   <span>Delivery</span><span className="font-bold text-text-primary">${data.summary.delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-text-primary pt-4 mt-2">
                   <span>Total</span><span>${data.summary.total}</span>
                </div>
             </div>
          </Card>

          <SectionHeader title="Payment Information" />
          <Card>
             <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">VISA</div>
                <div>
                    <p className="text-sm font-bold text-text-primary">Payment Method: {data.payment.method}</p>
                    <p className="text-xs text-text-secondary">Card ending in: **** {data.payment.last4}</p>
                </div>
             </div>
             <p className="text-xs text-text-secondary">Paid on: {data.payment.date}</p>
          </Card>
        </div>

      </div>
    </div>
  );
}