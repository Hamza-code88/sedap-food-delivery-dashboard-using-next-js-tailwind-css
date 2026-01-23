"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Filter, MoreVertical, Ban, CheckCircle } from "lucide-react";
import { CUSTOMERS_DATA } from "../lib/data";

export default function CustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = CUSTOMERS_DATA.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-text-primary">Customer List</h1>
           <p className="text-sm text-text-secondary">Manage your active users.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search customer..."
                className="pl-10 pr-4 py-3 w-full rounded-2xl border border-gray-100 bg-white outline-none focus:border-primary shadow-sm"
              />
           </div>
           <button className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-text-secondary hover:text-primary"><Filter size={20}/></button>
        </div>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-50 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-gray-100 text-text-secondary text-sm">
                     <th className="p-6 font-bold">Customer Name</th>
                     <th className="p-6 font-bold">Join Date</th>
                     <th className="p-6 font-bold">Total Orders</th>
                     <th className="p-6 font-bold">Total Spent</th>
                     <th className="p-6 font-bold">Status</th>
                     <th className="p-6 font-bold text-right">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {filtered.map((customer) => (
                     <tr key={customer.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="p-6">
                           <div className="flex items-center gap-3">
                              <Image src={customer.avatar} alt={customer.name} width={40} height={40} className="rounded-full" />
                              <div>
                                 <p className="font-bold text-text-primary">{customer.name}</p>
                                 <p className="text-xs text-text-secondary">{customer.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-6 text-sm text-text-secondary font-medium">{customer.joinDate}</td>
                        <td className="p-6">
                            <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-xs font-bold">{customer.orders} Orders</span>
                        </td>
                        <td className="p-6 font-bold text-primary">{customer.totalSpent}</td>
                        <td className="p-6">
                           {customer.status === "Active" ? (
                              <span className="flex items-center gap-1 text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-bold w-fit"><CheckCircle size={12}/> Active</span>
                           ) : (
                              <span className="flex items-center gap-1 text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs font-bold w-fit"><Ban size={12}/> Blocked</span>
                           )}
                        </td>
                        <td className="p-6 text-right">
                           <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><MoreVertical size={18}/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}