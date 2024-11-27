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
            {/* Content Wrapper */}
            <div className="grid grid-rows-[auto_1fr] grid-cols-[1fr 300px] min-h-screen bg-white font-barlow">
                <div className="row-start-1 col-span-2 bg-white mx-4">
                    <Topbar/>
                </div>

                <div className="row-start-2 col-start-1 px-8 bg-custom-landing">
                    <MainContent/>
                </div>

                <div className="row-start-2 col-start-2 bg-gray-100">
                    <RightSidebar/>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
