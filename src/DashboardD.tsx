import React from 'react';
import SidebarComponent from './SidebarD.tsx';
import Topbar from './Topbar.tsx';
import MainContent from './MainContentD.tsx';
import RightSidebar from "./dapp-delivery-accept-offer.tsx";


const Dashboard = () => {
    return (
        <div
            className="flex overflow-visible bg-white min-h-screen min-w-screen font-barlow">
                <SidebarComponent/>
            <div className="flex flex-col flex-grow px-8 bg-custom-landing">
                <Topbar/>
                <MainContent/>
            </div>
            <RightSidebar/>
        </div>
    );
};

export default Dashboard;
