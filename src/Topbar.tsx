'use client'

import * as React from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Cookies from "js-cookie";

export default function Topbar() {
    // Get the user's name from Cookies
    const userLogin = Cookies.get('userLogin');
    let userName = "";

    if (userLogin) {
        userName = JSON.parse(userLogin).username || "";
    }
    return (
        <div className="flex flex-col self-stretch my-auto items-start max-md:mt-10 max-md:max-w-full">
            <header className="flex gap-4 justify-between w-full max-md:max-w-full pt-4">
                <h2 className="text-3xl font-bold text-zinc-800">Hello, {userName ? userName:" Guest"}!</h2>
                <div className="flex items-center space-x-4 w-1/2 max-w-md">
                    <form className="flex w-full items-center space-x-2">
                        <div className="relative flex-grow">
                            <Input
                                type="search"
                                placeholder="What do you want to eat today..."
                                className="pl-10 pr-4 py-2 w-full text-lg bg-white rounded-2xl text-zinc-600 border-none"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                variant="ghost"
                                className="absolute left-1 top-1/2 transform -translate-y-1/2"
                            >
                                <Search className="h-6 w-6 text-yellow-500" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    )
}
