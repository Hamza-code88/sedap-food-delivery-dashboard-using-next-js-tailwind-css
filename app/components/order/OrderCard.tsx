"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Order } from "../../types";
import Image from "next/image";
import { Clock } from "lucide-react";
import Link from "next/link"; // Link Import karo

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id, data: { ...order } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 cursor-grab touch-none rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow active:cursor-grabbing border border-transparent hover:border-primary/20 relative"
    >
      {/* Header: ID and Price */}
      <div className="flex justify-between items-start mb-3">
        
        {/* 🔥 IMPORTANT: Link Add kar diya. Dragging avoid karne ke liye 'onPointerDown' stopPropagation use kar sakte hain agar issue aye */}
        <Link 
            href={`/orders/${order.id}`} 
            className="text-xs font-bold text-primary bg-primary-light px-2 py-1 rounded-lg hover:bg-primary hover:text-white transition-colors cursor-pointer z-50 relative"
            onPointerDown={(e) => e.stopPropagation()} // Taaki drag na shuru ho jab button click ho
        >
          {order.orderId}
        </Link>

        <span className="text-sm font-bold text-text-primary">{order.total}</span>
      </div>

      {/* Item List */}
      <div className="mb-4">
        {order.items.map((item, idx) => (
          <p key={idx} className="text-xs font-medium text-text-secondary line-clamp-1">
            • {item}
          </p>
        ))}
      </div>

      {/* Footer: User & Time */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden relative">
                <Image 
                    src={order.avatar} 
                    alt={order.customerName} 
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-xs font-semibold text-text-primary">{order.customerName}</span>
        </div>
        
        <div className="flex items-center gap-1 text-text-muted">
            <Clock size={12} />
            <span className="text-[10px]">{order.time}</span>
        </div>
      </div>
    </div>
  );
};