import React from 'react';
import SidebarComponent from './Sidebar.tsx';
import Topbar from './Topbar.tsx';
import MainContent from './MainContent.tsx';
//import RightSidebar from "./RightSidebar.tsx";
import RightSidebar from "./food-delivery-app.tsx";


const Dashboard = () => {
    return (
        <div
            className="flex overflow-visible bg-white min-h-screen min-w-screen font-barlow">
                <SidebarComponent/>
            {/* MainContent section */}
            <div className="flex flex-col flex-grow px-8 bg-custom-landing">
                <Topbar/>
                <MainContent/>
            </div>
            <RightSidebar/>
        </div>
    );
};

export default Dashboard;
