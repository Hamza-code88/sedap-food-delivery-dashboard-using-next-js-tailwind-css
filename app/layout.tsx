import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
// Sidebar aur Header ko import kar rahe hain

export const metadata: Metadata = {
  title: "Sedap Admin Dashboard",
  description: "Modern Food Delivery Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Font hum globals.css se manage kar rahe hain isliye yahan class di */}
      <body className="antialiased bg-background text-text-primary font-sans">
        
        {/* Main Layout Flex Container */}
        <div className="flex min-h-screen">
          
          {/* Left Sidebar (Fixed) */}
          <Sidebar />
          

          {/* Right Content Area */}
          <main className="flex-1 w-full md:pl-[280px]">
            {/* Top Header */}
            <Header />
            
            {/* Page Content (Dashboard Widgets yahan ayenge) */}
            <div className="px-8 pb-10">
              {children}
            </div>
          </main>
          
        </div>
      </body>
    </html>
  );
}