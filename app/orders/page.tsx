import React from "react";
import { KanbanBoard } from "../components/order/KanbanBoard";


export default function OrdersPage() {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
       {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Order List</h2>
          <p className="text-sm text-text-secondary">Manage your kitchen workflow efficiently.</p>
        </div>
        
        {/* Extra Action Buttons */}
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-text-primary text-sm font-semibold rounded-xl shadow-sm hover:bg-gray-50 border border-gray-100">
                History
            </button>
            <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-primary-hover">
                + New Order
            </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1">
         <KanbanBoard/>
      </div>
    </div>
  );
}