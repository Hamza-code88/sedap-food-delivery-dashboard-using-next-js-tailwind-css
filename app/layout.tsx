import type { Metadata } from "next";
import "./globals.css";
// Humara naya wrapper import karein
import DashboardLayout from "./components/layout/DashboardLayout";

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
      <body className="antialiased bg-background text-text-primary font-sans">
        {/* Sara logic ab is component ke andar hai */}
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}