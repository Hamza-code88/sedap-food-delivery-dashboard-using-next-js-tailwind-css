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
  bgColor: string;   // Background circle color
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