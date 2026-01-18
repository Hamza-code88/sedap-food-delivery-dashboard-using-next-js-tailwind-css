import { StatsGrid } from "./components/dashboard/StatsGrid";
import { ChartsRowOne } from "./components/dashboard/ChartsRowOne";
import { ChartsRowTwo } from "./components/dashboard/ChartsRowTwo";
import { CustomerReviews } from "./components/dashboard/CustomerReviews";

export default function Home() {
  // --- Date Logic Start ---
  const today = new Date(); // Aaj ki date
  const pastDate = new Date(); 
  pastDate.setMonth(today.getMonth() - 5); // 5 Mahine peechay

  // Date ko "17 April 2020" format mein convert karne ka tareeqa
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const dateRange = `${formatDate(pastDate)} - ${formatDate(today)}`;
  // --- Date Logic End ---

  return (
    <div className="space-y-8">
      {/* 1. Header Area */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
          <p className="text-sm text-text-secondary">Hi, Samantha. Welcome back to Sedap Admin!</p>
        </div>
        
        {/* Date Filter Box */}
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <div className="text-left">
            <p className="text-xs text-text-secondary">Filter Periode</p>
            
            {/* Yahan humne variable use kiya */}
            <p className="text-xs font-bold text-text-primary">
              {dateRange}
            </p>
          
          </div>
          <span className="text-gray-400 text-xs">▼</span>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <StatsGrid />

      {/* 3. Row One */}
      <ChartsRowOne />

      {/* 4. Row Two */}
      <ChartsRowTwo />

      {/* 5. Customer Review */}
      <CustomerReviews />
      
    </div>
  );
}