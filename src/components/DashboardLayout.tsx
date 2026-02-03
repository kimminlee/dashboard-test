import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-dark-bg text-white p-4 md:p-8 flex flex-col gap-6">
      {/* Header Section */}
      <header className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink drop-shadow-lg">
            ENERGY CORE <span className="text-xs md:text-sm text-gray-400 font-normal block md:inline md:ml-2">2026 Smart Building System</span>
          </h1>
        </div>
        <div className="flex gap-4 text-sm font-mono text-neon-cyan">
          <div className="px-3 py-1 rounded border border-neon-cyan/30 shadow-neon-cyan bg-neon-cyan/5">
            LIVE SYSTEM
          </div>
        </div>
      </header>

      {/* Main Grid Layout (Bento Grid) */}
      {/* Mobile: 1열, Tablet: 2열, Desktop: 4열 */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
        {children}
      </main>
      
      <footer className="text-center text-gray-600 text-xs py-4">
        POWERED BY REACT 19 & TAILWIND V4
      </footer>
    </div>
  );
};