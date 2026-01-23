import { 
  Users, 
  BarChart2, 
  MessageSquare, 
  Calendar, 
  Wallet, 
  FileText, 
  Home,
  ListCheck,
  CupSoda
} from "lucide-react";
import { NavItem, DashboardStat, Review, Order, KanbanColumn , OrderDetailData, FoodItem, MonthlyRevenue, AnalyticsSummary, Customer, Transaction, ChatContact} from "../types/index";

// --- Sidebar Navigation Data ---
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: Home,  href: "/" },
{ label: "Order List", icon: ListCheck, href: "/orders" },
  { label: "Order Detail", icon: FileText, href: "/orders/1" },
  { label: "Foods", icon: CupSoda, href: "/foods" },
  { label: "Analytics", icon: BarChart2, href: "/analytics" },
  { label: "Customer", icon: Users, href: "/customer" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
  { label: "Chat", icon: MessageSquare, href: "/message" },
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


// order list data 


// --- Order Data for Kanban ---
export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: "Pending", title: "New Orders 🔔" },
  { id: "Cooking", title: "Cooking 🍳" },
  { id: "Ready", title: "Ready to Serve 🥡" },
  { id: "Delivered", title: "Completed ✅" },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "1",
    orderId: "#ORD-001",
    customerName: "Jons Sena",
    items: ["Spicy Seasoned Seafood Noodles", "Mushroom Soup"],
    total: "$12.50",
    status: "Pending",
    time: "10 min ago",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    orderId: "#ORD-002",
    customerName: "Sofia",
    items: ["Salted Pasta with Mushroom Sauce"],
    total: "$8.20",
    status: "Cooking",
    time: "25 min ago",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    orderId: "#ORD-003",
    customerName: "Anandreansyah",
    items: ["Beef Dumpling in Hot Soup"],
    total: "$15.00",
    status: "Ready",
    time: "40 min ago",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    orderId: "#ORD-004",
    customerName: "Samantha",
    items: ["Healthy Salad"],
    total: "$5.50",
    status: "Delivered",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    orderId: "#ORD-005",
    customerName: "Alex Doe",
    items: ["Cheesy Pizza XL"],
    total: "$22.00",
    status: "Pending",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
];


//  order details data 

export const ORDER_DETAIL_MOCK: OrderDetailData = {
  orderId: "#ORD-0012",
  status: "Cooking",
  customer: {
    name: "Samantha R.",
    email: "samantha.7@email.com",
    address: "Cusbing Address: tibons 244 067\nPhone: 123-456-7890\nThure Mon: 2024-07-28",
    phone: "123-456-7890",
    date: "2024-07-28",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  timeline: [
    { status: "Order Placed", time: "10:30 AM", completed: true, icon: "Check" },
    { status: "Cooking", time: "Cooking", completed: true, icon: "Chef" }, // Active
    { status: "Ready for Pickup", time: "Ready for Pickup", completed: false, icon: "Bell" },
    { status: "Delivered", time: "Est. 11:00 AM", completed: false, icon: "Truck" },
  ],
  items: [
    { id: "1", name: "Spicy Chicken Burger", description: "Large French Fries", quantity: 1, price: 12.00 },
    { id: "2", name: "Large French Fries", description: "Coca Cola (2)", quantity: 1, price: 2.00 }, // Image me $2 hai
  ],
  summary: {
    subtotal: 12.00,
    tax: 1.95,
    delivery: 0.00,
    total: 24.45,
  },
  payment: {
    method: "Credit Card",
    last4: "4567",
    date: "2024-07-26",
  }
};



export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "1",
    name: "Spicy Seasoned Seafood Noodles",
    category: "Snacks",
    price: "$2.29",
    description: "Great spicy noodles with seafood flavor.",
    rating: 4.5,
    reviews: 20,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60" 
  },
  {
    id: "2",
    name: "Salted Pasta with Mushroom Sauce",
    category: "Snacks",
    price: "$5.29",
    description: "Creamy mushroom sauce with perfectly cooked pasta.",
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    name: "Beef Dumpling in Hot Soup",
    category: "Snacks",
    price: "$3.49",
    description: "Traditional dumplings served in spicy broth.",
    rating: 4.8,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1541696490865-92dc7212a584?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    name: "Double Cheese Burger",
    category: "Burger",
    price: "$12.00",
    description: "Juicy beef patty with double cheddar cheese.",
    rating: 4.9,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "5",
    name: "Italian Pepperoni Pizza",
    category: "Pizza",
    price: "$15.50",
    description: "Classic pizza with spicy pepperoni slices.",
    rating: 4.7,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "6",
    name: "Fresh Strawberry Shake",
    category: "Drinks",
    price: "$4.50",
    description: "Fresh strawberries blended with milk and ice cream.",
    rating: 4.6,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format&fit=crop&q=60"
  }
];



// ... Purana data ...

// --- Analytics Mock Data ---
export const ANALYTICS_STATS: AnalyticsSummary = {
  totalRevenue: "$128,430",
  revenueGrowth: "+12%",
  totalOrders: "5,230",
  ordersGrowth: "+5.4%",
  totalCustomers: "3,200",
  customersGrowth: "-1.2%"
};

export const REVENUE_CHART_DATA: MonthlyRevenue[] = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4200 },
  { name: 'Sep', revenue: 5800 },
  { name: 'Oct', revenue: 6500 },
  { name: 'Nov', revenue: 7200 },
  { name: 'Dec', revenue: 8500 },
];






// --- Mock Customers ---
export const CUSTOMERS_DATA: Customer[] = [
  { id: "1", name: "Samantha William", email: "samantha@email.com", orders: 45, totalSpent: "$1,240", status: "Active", avatar: "https://i.pravatar.cc/150?u=1", joinDate: "2024-01-12" },
  { id: "2", name: "Tony Soap", email: "tony@email.com", orders: 12, totalSpent: "$450", status: "Active", avatar: "https://i.pravatar.cc/150?u=2", joinDate: "2024-02-15" },
  { id: "3", name: "Karen Hope", email: "karen@email.com", orders: 8, totalSpent: "$120", status: "Blocked", avatar: "https://i.pravatar.cc/150?u=3", joinDate: "2024-03-10" },
  { id: "4", name: "Jordan Nico", email: "jordan@email.com", orders: 22, totalSpent: "$890", status: "Active", avatar: "https://i.pravatar.cc/150?u=4", joinDate: "2024-01-20" },
];

// --- Mock Wallet Transactions ---
export const WALLET_TRANSACTIONS: Transaction[] = [
  { id: "1", name: "Order #ORD-0012", date: "Today, 10:30 AM", amount: "+$124.00", status: "Completed", type: "Income" },
  { id: "2", name: "Refund to Samantha", date: "Yesterday, 04:00 PM", amount: "-$12.50", status: "Completed", type: "Expense" },
  { id: "3", name: "Order #ORD-0011", date: "Yesterday, 02:15 PM", amount: "+$45.00", status: "Completed", type: "Income" },
  { id: "4", name: "Payout to Bank", date: "Oct 24, 2025", amount: "-$2,000.00", status: "Pending", type: "Expense" },
];

// --- Mock Chat Contacts ---
export const CHAT_CONTACTS: ChatContact[] = [
  { id: "1", name: "Samantha W.", avatar: "https://i.pravatar.cc/150?u=1", lastMessage: "Where is my burger? 🍔", time: "10:30 AM", unread: 2, status: "online" },
  { id: "2", name: "Driver Mike", avatar: "https://i.pravatar.cc/150?u=8", lastMessage: "I'm at the location.", time: "09:15 AM", unread: 0, status: "offline" },
  { id: "3", name: "Tony Soap", avatar: "https://i.pravatar.cc/150?u=2", lastMessage: "Thanks for the food!", time: "Yesterday", unread: 0, status: "online" },
];