import { LucideIcon } from "lucide-react";

// --- Navigation Type ---
export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

// --- User Profile Type ---
export interface UserProfile {
  name: string;
  role: string; // 'Admin' | 'User' etc.
  avatar: string; // URL
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string; // e.g. "(30 days)"
  };
  icon: string; // CHANGE: LucideIcon hata kar string kar diya (PNG path ke liye)
  iconColor?: string; // Optional, agar zaroorat padi
  bgColor: string; // Background circle color
}

export interface Review {
  id: string;
  name: string;
  time: string;
  text: string;
  rating: number;
  avatar: string;
  foodImage: string;
}

//  order list types

// ... purani types ...

// --- Kanban Board Types ---
export type OrderStatus = "Pending" | "Cooking" | "Ready" | "Delivered";

export interface Order {
  id: string;
  orderId: string; // e.g., #1234
  customerName: string;
  items: string[]; // e.g., ["Spicy Burger", "Fries"]
  total: string;
  status: OrderStatus;
  time: string; // e.g., "10:30 AM"
  avatar: string; // User image
}

export interface KanbanColumn {
  id: OrderStatus;
  title: string;
}

// --- Order Detail Page Types ---
export interface OrderTimelineStep {
  status: string;
  time: string;
  completed: boolean;
  icon: "Chef" | "Bell" | "Truck" | "Check"; // Icon keys
}

export interface OrderItemDetail {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  image?: string; // Optional (Burger icon)
}

export interface OrderDetailData {
  orderId: string;
  status: "Cooking" | "Pending" | "Delivered";
  customer: {
    name: string;
    email: string;
    address: string;
    phone: string;
    date: string;
    avatar: string;
  };
  timeline: OrderTimelineStep[];
  items: OrderItemDetail[];
  summary: {
    subtotal: number;
    tax: number;
    delivery: number;
    total: number;
  };
  payment: {
    method: string;
    last4: string;
    date: string;
  };
}

// --- Food Menu Types ---
export interface FoodItem {
  id: string;
  name: string;
  category: "Pizza" | "Burger" | "Drinks" | "Dessert" | "Snacks";
  price: string; // e.g. "$12.00"
  description: string;
  rating: number;
  reviews: number;
  image: string;
}

// --- Analytics Types ---
export interface MonthlyRevenue {
  name: string;
  revenue: number;
}

export interface AnalyticsSummary {
  totalRevenue: string;
  revenueGrowth: string;
  totalOrders: string;
  ordersGrowth: string;
  totalCustomers: string;
  customersGrowth: string;
}

// --- Customer Types ---
export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  status: "Active" | "Blocked";
  avatar: string;
  joinDate: string;
}

// --- Wallet Types ---
export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
  type: "Income" | "Expense";
}

// --- Message Types ---
export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "online" | "offline";
}
