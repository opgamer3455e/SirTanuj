import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function CMSLayout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-10 max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
}
