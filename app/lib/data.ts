import { 
  LayoutGrid, 
  ClipboardList, 
  Users, 
  BarChart2, 
  MessageSquare, 
  ShoppingBag, 
  Calendar, 
  Wallet, 
  FileText, // Order Detail placeholder
  Star,      // Review placeholder
  Home,
  ListCheck,
  CupSoda
} from "lucide-react";
import { NavItem, DashboardStat, Review } from "../types/index";


// --- Sidebar Navigation Data ---
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: Home,  href: "/" },
  { label: "Order List", icon: ListCheck, href: "/orders" },
  { label: "Order Detail", icon: FileText, href: "/order-detail" },
  { label: "Customer", icon: Users, href: "/customers" },
  { label: "Analytics", icon: BarChart2, href: "/analytics" },
  { label: "Reviews", icon: Star, href: "/reviews" },
  { label: "Foods", icon: CupSoda, href: "/foods" },
  { label: "Food Detail", icon: FileText, href: "/food-detail" },
  { label: "Customer Detail", icon: Users, href: "/customer-detail" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
  { label: "Chat", icon: MessageSquare, href: "/chat" },
  { label: "Wallet", icon: Wallet, href: "/wallet" },
];


export const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "1",
    label: "Total Orders",
    value: "75",
    trend: { value: 4, isPositive: true, label: "(30 days)" },
    icon: "/icons/icon 1.png", // Path to your PNG
    bgColor: "bg-[#E6F7F1]", // Light Green
  },
  {
    id: "2",
    label: "Total Delivered",
    value: "357",
    trend: { value: 4, isPositive: true, label: "(30 days)" },
    icon: "/icons/icon  2.png",
    bgColor: "bg-[#E6F7F1]", // Light Green
  },
  {
    id: "3",
    label: "Total Canceled",
    value: "65",
    trend: { value: 25, isPositive: false, label: "(30 days)" },
    icon: "/icons/icon 3.png",
    bgColor: "bg-[#FFEDED]", // Light Red
  },
  {
    id: "4",
    label: "Total Revenue",
    value: "$128",
    trend: { value: 12, isPositive: false, label: "(30 days)" },
    icon: "/icons/icon 4.png",
    bgColor: "bg-[#FFEDED]", // Light Red
  },
];



export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Jons Sena",
    time: "2 days ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", 
    foodImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80", 
  },
  {
    id: "2",
    name: "Sofia",
    time: "2 days ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    rating: 4.0,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    foodImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80", 
  },
  {
    id: "3",
    name: "Anandreansyah",
    time: "2 days ago",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    foodImage: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=80", 
  },
  {
    id: "4", // Extra data to test slider
    name: "Samantha",
    time: "3 days ago",
    text: "Standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it.",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    foodImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=80", 
  },
];