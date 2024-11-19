import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import BalanceCard from './BalanceCard';



function RightSidebar() {
    return (
        <aside className="flex flex-col ml-5 w-3/12 max-md:w-full">
            <div className="flex flex-col px-10 pt-4 pb-72 mx-auto w-full min-h-screen bg-white max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
                {/* Top Icons Section */}
                <div className="flex items-center justify-between w-full mb-6 gap-5">
                    <div className="flex space-x-4">
                        <div className="relative">
                            <NotificationsIcon fontSize="medium" style={{color: '#6B7280'}}/>
                            <span
                                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              3 {/* Notification count */}
                            </span>
                        </div>
                        <SettingsIcon fontSize="medium" style={{color: '#6B7280'}}/> {/* Setting Icon */}
                    </div>
                    <img
                        src="https://via.placeholder.com/40" // Replace with actual user avatar URL
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                </div>

                {/* Balance Section */}
                <BalanceCard />
            </div>
        </aside>
);
}

export default RightSidebar;
