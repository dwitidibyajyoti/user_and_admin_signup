// DashboardLayout.tsx
import React from 'react';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-4 w-full bg-gray-100 min-h-screen">
                <Outlet /> {/* Dynamic content */}
            </div>
        </div>
    );
};

export default DashboardLayout;
