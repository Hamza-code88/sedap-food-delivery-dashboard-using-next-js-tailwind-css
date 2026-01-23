"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KANBAN_COLUMNS, INITIAL_ORDERS } from "../../lib/data";
import { Order, OrderStatus } from "../../types";
import { OrderCard } from "./OrderCard";
import { cn } from "../../lib/utils";

export const KanbanBoard = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeOrder = orders.find((order) => order.id === activeId);

  // --- Logic 1: Find Container (Column) ID ---
  // Ye function pata lagayega ke koi item kis column mein hai
  const findContainer = (id: string): OrderStatus | undefined => {
    if (KANBAN_COLUMNS.some((col) => col.id === id)) {
      return id as OrderStatus;
    }
    const order = orders.find((o) => o.id === id);
    return order?.status;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // --- Logic 2: Drag Over (FIXED) ---
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    // Status Update Logic
    setOrders((prev) => {
      const activeItemIndex = prev.findIndex((o) => o.id === activeId);
      const updated = [...prev];
      
      // Update the status of the dragged item
      updated[activeItemIndex] = {
        ...updated[activeItemIndex],
        status: overContainer, // New Status assign kar diya
      };
      
      return updated;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver} // Drag karte waqt hi status change ho jayega
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col h-full bg-[#FAFAFA] rounded-3xl p-4 min-w-[280px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-text-primary text-lg">{column.title}</h3>
                <span className="bg-white text-text-secondary text-xs font-bold px-2 py-1 rounded-lg border border-gray-100">
                    {orders.filter((o) => o.status === column.id).length}
                </span>
            </div>

            {/* Droppable Area */}
            <SortableContext
              id={column.id}
              items={orders.filter((o) => o.status === column.id).map((o) => o.id)}
              strategy={verticalListSortingStrategy}
            >
              {/* 'ref' ki zaroorat nahi kyunki items khud sortable hain, 
                  lekin empty state ke liye hum droppable zone bana sakte hain */}
              <div className="flex-1 min-h-[100px]"> {/* min-h diya taaki empty hone par bhi drop ho sake */}
                 {orders
                    .filter((order) => order.status === column.id)
                    .map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
              </div>
            </SortableContext>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeOrder ? <OrderCard order={activeOrder} /> : null}
      </DragOverlay>
    </DndContext>
  );
};