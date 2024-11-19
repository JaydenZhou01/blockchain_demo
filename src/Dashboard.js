import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainContent from './MainContent';
import RightSidebar from "./RightSidebar";

const Dashboard = () => {
    return (
        <div className="flex overflow-visible gap-10 bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-grow bg-gray-100">
                <Topbar />
                <MainContent />
            </div>
            <RightSidebar />
        </div>
    );
};

export default Dashboard;
