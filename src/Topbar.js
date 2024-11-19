import React from 'react';
import {Search} from "@mui/icons-material";

const Topbar = () => {
    return (
        <div className="flex flex-col self-stretch my-auto items-start  max-md:mt-10 max-md:max-w-full">
            <header className="flex gap-4 justify-between w-full max-md:max-w-full pt-4">
                    <h2 className="text-4xl font-bold text-zinc-800">Hello, Patrick</h2>
                <div className="flex items-center space-x-4 w-1/2 max-w-md">
                    <form
                        className="flex w-full gap-2 px-6 py-3.5 text-lg bg-white rounded-2xl text-zinc-400 max-md:px-5">
                        <Search style={{color: "#F8B602"}} className="w-8 h-8"/>
                        <label htmlFor="searchInput" className="sr-only">Search for food</label>
                        <input
                            type="search"
                            id="searchInput"
                            className="flex-auto my-auto max-md:max-w-full bg-transparent border-none outline-none"
                            placeholder="What do you want eat today..."
                            aria-label="Search for food"
                        />
                    </form>
                </div>
            </header>
        </div>

    );
};

export default Topbar;
