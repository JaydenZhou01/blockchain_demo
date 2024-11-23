import React from 'react';
import SidebarComponent from './SidebarD.tsx';
import Topbar from './Topbar.tsx';
import MainContent from './MainContent.tsx';
import RightSidebar from "./dapp-delivery-accept-offer.tsx";


const Dashboard = () => {
    return (
        <div className="flex overflow-visible gap-10 bg-gray-100 min-h-screen min-w-screen">
            <SidebarComponent />
            <div className="flex flex-col flex-grow bg-gray-100">
                <Topbar />
                <MainContent />
            </div>
            <RightSidebar />    
        </div>
    );
};

export default Dashboard;
