'use client'

import * as React from 'react'
import {Bell, Search, Settings, Tv} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

export default function Topbar() {
    // Get the user's name from Cookies
    const userLogin = Cookies.get('userLogin');
    let userName = "";

    if (userLogin) {
        userName = JSON.parse(userLogin).username || "";
    }

    const avatarFallback = userName ? userName.charAt(0).toUpperCase() : "U";

    return (
        <div className="flex flex-col w-full bg-white py-4">
            <header className="flex items-center justify-between w-full flex-wrap gap-4">
                {/* Greeting Section */}
                <h2 className="text-4xl font-semibold text-zinc-800">
                    Hello, {userName ? userName : "Guest"}!
                </h2>

                {/* Search Bar Section */}
                <div className="flex-grow max-w-lg">
                    <form className="relative">
                        <Input
                            type="search"
                            placeholder="What do you want to eat today..."
                            className="pl-12 pr-4 py-2 w-full text-base bg-gray-100 rounded-full text-zinc-600 border-none"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Search className="h-5 w-5 text-yellow-500"/>
                            <span className="sr-only">Search</span>
                        </Button>
                    </form>
                </div>

                {/* Icons and User Section */}
                <div className="flex items-center gap-6">
                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <Tv className="h-5 w-5 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 cursor-pointer" />
                        <Bell className="h-5 w-5 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 cursor-pointer" />
                        <Settings className="h-5 w-5 text-yellow-500 hover:text-yellow-600 transition-colors duration-200 cursor-pointer" />
                    </div>

                    {/* User Avatar */}
                    <Link to="/login" className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10 border border-gray-300 rounded-full">
                            <AvatarImage alt="User" src="/placeholder.svg" />
                            <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </header>
        </div>
    );
}

