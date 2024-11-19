import React from 'react';

const menuItems = [
    { icon: '🏠', text: 'Dashboard', active: true },
    { icon: '🍔', text: 'Food Order' },
    { icon: '⭐', text: 'Favorite' },
    { icon: '💬', text: 'Message' },
    { icon: '📜', text: 'Order History' },
    { icon: '💵', text: 'Bills' },
    { icon: '⚙️', text: 'Setting' },
];

function Sidebar() {
    return (
        <aside className="flex flex-col w-[18%] max-md:w-full">
            <div className="flex flex-col grow px-6 pt-14 w-full bg-white pb-10 max-md:px-5 max-md:pb-24 max-md:mt-10">
                <h1 className="self-center text-3xl font-bold text-yellow-500">
                    GoMeal<span className="text-yellow-500">.</span>
                </h1>
                <nav className="flex flex-col mt-10 w-full text-lg font-medium text-zinc-400 max-md:mt-8">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`flex gap-4 items-center px-4 py-3 whitespace-nowrap rounded-lg ${
                                item.active ? 'text-white bg-yellow-500 shadow-lg' : 'text-gray-600'
                            }`}
                            style={{ width: '100%' }} // 确保导航项宽度适应父容器
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="truncate">{item.text}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
