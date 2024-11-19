import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function BalanceCard() {
    return (
        <div
            className="relative flex items-center justify-between p-4 rounded-xl shadow-lg"
            style={{
                backgroundImage: 'url(./src/assets/balance-bg.svg)',
                backgroundSize: 'cover',
                backgroundColor: '#F7A900',
            }}
        >
            {/* Balance Info */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-gray-600 text-sm font-medium">Balance</h3>
                <p className="text-3xl font-bold text-gray-800">$12.000</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                        <ArrowDownwardIcon style={{ color: '#333' }} />
                    </div>
                    <p className="text-white text-sm font-medium mt-1">Top Up</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-md">
                        <ArrowUpwardIcon style={{ color: '#333' }} />
                    </div>
                    <p className="text-white text-sm font-medium mt-1">Transfer</p>
                </div>
            </div>
        </div>
    );
}

export default BalanceCard;
