import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#dfe1e4] p-4 md:p-6 xl:p-8">
      <div className="mx-auto flex max-w-[1280px] overflow-hidden rounded-[30px] border border-[#e7e9eb] bg-[#f4f4f5] shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
        <Sidebar />

        <main className="ml-64 flex-1 bg-[#f6f7f9] p-3 md:p-4">
          <div className="rounded-[24px] bg-[#f9fafb] p-3 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;